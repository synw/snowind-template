import type { AgentInferenceOptions } from "@agent-smith/types";
import { getMarkdown, parseMarkdownToStructure, type ParsedNode } from "markstream-vue";
import { useClientFeatures } from "@agent-smith/wscli";
import { ref } from "vue";

const stream = ref("");
const nodes = ref<ParsedNode[]>([]);
let parseScheduled = false;
const PARSE_INTERVAL_MS = 50; // ~20 parses/sec
const md = getMarkdown();

function scrollOutput(delay = 50) {
    const maino = document.getElementById('bottom-output')!;
    const p: ScrollIntoViewOptions = { block: "end", inline: "nearest" };
    p.behavior = "smooth"
    if (delay > 0) {
        setTimeout(() => {
            // @ts-ignore
            maino.scrollIntoView(p);
        }, delay);
    } else {
        maino.scrollIntoView(p);
    }
}

function parseChunk(chunk: string) {
    stream.value += chunk;
    if (!parseScheduled) {
        parseScheduled = true;
        setTimeout(() => {
            try {
                // @ts-ignore
                nodes.value = parseMarkdownToStructure(stream.value, md, { final: true });
            } catch (e) {
                throw (`PARSE ERROR ${e}`)
            }
            parseScheduled = false;
            scrollOutput();
        }, PARSE_INTERVAL_MS);
    }
}

const useTaskEvents = (() => {
    const onTurnStart: AgentInferenceOptions["onTurnStart"] = (f) => {
        stream.value = "";
        nodes.value = []
    }

    const onToken: AgentInferenceOptions["onToken"] = (chunk: string, from: string) => {
        parseChunk(chunk)
    }

    const onThinkingToken: AgentInferenceOptions["onThinkingToken"] = (chunk: string, from: string) => {
        parseChunk(chunk)
    }

    const onEndThinking: AgentInferenceOptions["onEndThinking"] = (from: string) => {
        stream.value = "";
        nodes.value = [];
    }

    const onAssistant: AgentInferenceOptions["onAssistant"] = (txt: string, from: string) => {
        console.log("ASSISTANT", txt);

    }

    return {
        onTurnStart,
        onToken,
        onThinkingToken,
        onEndThinking,
        onAssistant,
    }
});

const srv = useClientFeatures(useTaskEvents());

export {
    stream,
    nodes,
    srv,
}