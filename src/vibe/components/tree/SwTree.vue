<template>
    <div class="sw-tree">
        <input v-if="filter" v-model="query" type="text" placeholder="Search" aria-label="Search"
            class="mb-1 w-full rounded border border-semilight bg-background px-2 py-1 text-sm outline-none focus:border-prim" />
        <ul v-if="rows.length" role="tree" class="m-0 list-none p-0">
            <li v-for="row in rows" :key="row.node.key">
                <button type="button" role="treeitem" :aria-multiselectable="selectionMode === 'multiple'"
                    :aria-expanded="row.hasChildren ? row.expanded : undefined"
                    :aria-selected="selectedKey === row.node.key"
                    class="flex w-full cursor-pointer select-none items-center gap-1 rounded py-1 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-prim tree-item"
                    :class="selectedKey === row.node.key ? 'prim' : 'hover:bg-superlight'"
                    :style="{ paddingLeft: `${16 + row.depth * 16}px` }" @click="onRowClick(row)">
                    <svg v-if="row.hasChildren" viewBox="0 0 16 16" aria-hidden="true"
                        class="h-3 w-3 shrink-0 transition-transform duration-200"
                        :class="row.expanded ? 'rotate-90' : ''">
                        <path fill="currentColor" d="M5.5 3l6 5-6 5V3z" />
                    </svg>
                    <span v-else class="w-3 shrink-0"></span>
                    <slot :node="row.node">{{ row.node.label }}</slot>
                </button>
            </li>
        </ul>
        <div v-else-if="query.trim()" class="px-2 py-1 text-sm text-semilight">No results found.</div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface SwTreeNode {
    key: string;
    label: string;
    children?: SwTreeNode[];
}

interface Row {
    node: SwTreeNode;
    depth: number;
    expanded: boolean;
    hasChildren: boolean;
}

const props = withDefaults(defineProps<{
    nodes: SwTreeNode[];
    filter?: boolean;
    selectionMode?: 'single' | 'multiple';
    expandedKeys?: Record<string, boolean>;
}>(), {
    filter: true,
    selectionMode: 'single',
    expandedKeys: undefined,
});

const emit = defineEmits<{
    nodeSelect: [node: SwTreeNode];
    'update:expandedKeys': [keys: Record<string, boolean>];
}>();

const query = ref('');
const selectedKey = ref<string | null>(null);
// The tree starts collapsed, so we only track expanded nodes.
// When `v-model:expandedKeys` is bound the parent owns the state; otherwise an internal Set is used.
const internalExpandedKeys = ref<Set<string>>(new Set());

function isExpanded(key: string): boolean {
    if (props.expandedKeys) return !!props.expandedKeys[key];
    return internalExpandedKeys.value.has(key);
}

function toggleExpanded(row: Row) {
    if (props.expandedKeys) {
        emit('update:expandedKeys', { ...props.expandedKeys, [row.node.key]: !isExpanded(row.node.key) });
    } else {
        const keys = internalExpandedKeys.value;
        if (keys.has(row.node.key)) keys.delete(row.node.key);
        else keys.add(row.node.key);
    }
}

const q = computed(() => query.value.trim().toLowerCase());

function matches(node: SwTreeNode): boolean {
    if (node.label.toLowerCase().includes(q.value)) return true;
    return node.children?.some(matches) ?? false;
}

function walk(nodes: SwTreeNode[], depth: number, out: Row[]) {
    for (const node of nodes) {
        const hasChildren = !!node.children?.length;
        if (q.value && !matches(node)) continue;
        // While filtering, matched branches are force-expanded (PrimeVue lenient mode).
        const expanded = q.value ? true : isExpanded(node.key);
        out.push({ node, depth, expanded, hasChildren });
        if (hasChildren && expanded) walk(node.children!, depth + 1, out);
    }
}

const rows = computed<Row[]>(() => {
    const out: Row[] = [];
    walk(props.nodes, 0, out);
    return out;
});

function onRowClick(row: Row) {
    if (row.hasChildren) toggleExpanded(row);
    selectedKey.value = row.node.key;
    emit('nodeSelect', row.node);
}
</script>
