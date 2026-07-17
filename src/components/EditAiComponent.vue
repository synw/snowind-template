<template>
    <div>
        <div class="flex flex-col w-full space-y-3 mb-12" v-if="showEditor">
            <div>
                Edit component {{ component }}
            </div>
            <div>
                <textarea v-model="_data" :rows="rows"
                    class="w-full overflow-y-visible focus:ring-0 focus:border-lighter" />
            </div>
            <div class="flex flex-row justify-end space-x-3 w-full">
                <div v-if="nTokens > 0" class="txt-semilight">{{ nTokens }} tokens</div>
                <div class="grow flex justify-end space-x-3">
                    <button class="light btn px-4 py-2 rounded" @click="showEditor = false">Close</button>
                    <button class="warning btn px-4 py-2 rounded" @click="onRevert()">Revert</button>
                    <button class="success btn px-4 py-2 rounded" @click="exec()">Submit</button>
                </div>
            </div>
            <pre>
                <code>
                {{ resp }}
                </code>
            </pre>
        </div>
        <div v-else class="flex flex-row justify-end relative -top-16 right-4">
            <button class="btn flex flex-row items-center p-3 secondary rounded-full"
                @click="showEditor = !showEditor">✏️</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { srv } from '../services/inference.js';

const props = defineProps({
    component: {
        type: String,
        required: true
    }
})

const showEditor = ref(false);
const data = "";
const maxlines = 8;
const _data = ref(data);
const resp = ref("");
const componentPath = "/workspace/src/aiwidgets/" + props.component;
const nTokens = ref(0);

async function exec() {
    await srv.load("edit-astro-component");
    const data = _data.value;
    console.log("Prompt:", data);
    const opts = { variables: { componentPath: componentPath } }
    await srv.executeAgent(data, opts);
}

async function onRevert() {
    resp.value = "";
    await srv.load("rever-component");
    const opts = { variables: { componentPath: componentPath } }
    await srv.executeAgent("", opts);
}

const rows = computed(() => {
    const nlines = _data.value.split("\n").length;
    if (nlines > maxlines) {
        return maxlines
    }
    return nlines
});
</script>