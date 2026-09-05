<template>
    <div ref="root" class="sw-listbox rounded-md border border-semilight bg-background p-1">
        <input v-if="filter" v-model="query" type="text" placeholder="Filter" aria-label="Filter options"
            class="mb-1 w-full rounded border border-semilight bg-background px-2 py-1 text-sm outline-none focus:border-prim"
            @keydown="onFilterKeydown" />
        <ul v-if="rows.length" role="listbox" class="m-0 max-h-56 list-none overflow-y-auto p-0"
            @keydown="onListKeydown">
            <li v-for="(option, i) in rows" :key="labelOf(option) + '_' + i" role="option"
                :aria-selected="isSelected(option)" :tabindex="i === tabbableIndex ? 0 : -1"
                class="cursor-pointer select-none rounded px-2 py-1 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-prim"
                :class="isSelected(option) ? 'prim' : 'hover:bg-superlight'"
                @click="onOptionClick(i)" @focus="onOptionFocus(i)">
                {{ labelOf(option) }}
            </li>
        </ul>
        <div v-else-if="query.trim()" class="px-2 py-1 text-sm text-semilight">No results found.</div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{
    options: any[];
    modelValue?: any;
    optionLabel?: string;
    filter?: boolean;
    focused?: boolean;
}>(), {
    optionLabel: 'label',
    filter: false,
    focused: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: any];
}>();

const root = ref<HTMLElement | null>(null);
const query = ref('');
const activeIndex = ref(-1);
let observer: IntersectionObserver | null = null;

const rows = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return props.options;
    return props.options.filter(o => labelOf(o).toLowerCase().includes(q));
});

// Roving tabindex: a single option is tabbable at any time.
const tabbableIndex = computed(() => activeIndex.value === -1 ? 0 : activeIndex.value);

function labelOf(option: any): string {
    if (typeof option === 'string' || typeof option === 'number') return String(option);
    const value = option?.[props.optionLabel];
    return value == null ? '' : String(value);
}

function isSelected(option: any): boolean {
    return option === props.modelValue;
}

function selectOption(option: any) {
    // PrimeVue-compatible toggle: selecting the current option clears it.
    emit('update:modelValue', isSelected(option) ? null : option);
}

function onOptionClick(index: number) {
    activeIndex.value = index;
    const option = rows.value[index];
    if (option !== undefined) selectOption(option);
}

function onOptionFocus(index: number) {
    activeIndex.value = index;
}

function focusOption(index: number) {
    if (!rows.value.length) return;
    activeIndex.value = index;
    nextTick(() => {
        const el = root.value?.querySelectorAll('li[role="option"]')[index] as HTMLElement | null;
        el?.focus();
    });
}

function onFilterKeydown(e: KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    focusOption(e.key === 'ArrowDown' ? 0 : rows.value.length - 1);
}

function onListKeydown(e: KeyboardEvent) {
    const n = rows.value.length;
    if (!n) return;
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            focusOption(Math.min(activeIndex.value + 1, n - 1));
            break;
        case 'ArrowUp':
            e.preventDefault();
            focusOption(Math.max(activeIndex.value - 1, 0));
            break;
        case 'Home':
            e.preventDefault();
            focusOption(0);
            break;
        case 'End':
            e.preventDefault();
            focusOption(n - 1);
            break;
        case 'Enter':
        case ' ': {
            e.preventDefault();
            const option = rows.value[activeIndex.value];
            if (option !== undefined) selectOption(option);
            break;
        }
    }
}

function focusList() {
    const target = props.filter ? root.value?.querySelector('input') : root.value?.querySelector('li[role="option"]');
    (target as HTMLElement | null)?.focus();
}

onMounted(() => {
    if (!props.focused || !root.value) return;
    // Focus the listbox each time it becomes visible (works with v-show).
    observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) focusList();
    });
    observer.observe(root.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>
