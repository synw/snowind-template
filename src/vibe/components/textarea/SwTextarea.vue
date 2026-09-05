<template>
    <textarea ref="el" :value="modelValue" :rows="rows"
        class="block w-full resize-none rounded border bg-transparent p-2 text-sm text-on-background outline-none focus:ring-0"
        :class="borderClass" @input="onInput" />
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    modelValue?: string;
    rows?: number;
    autoResize?: boolean;
    borderClass?: string;
}>(), {
    modelValue: '',
    rows: 1,
    autoResize: false,
    borderClass: 'border-lighter',
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const el = ref<HTMLTextAreaElement | null>(null);

// Grow the box to fit its content instead of showing a scrollbar.
function resize() {
    const t = el.value;
    if (!t) return;
    t.style.height = 'auto';
    t.style.height = `${t.scrollHeight}px`;
}

onMounted(() => { if (props.autoResize) resize(); });

watch(() => [props.modelValue, props.rows], () => {
    if (props.autoResize) nextTick(resize);
});

function onInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
}
</script>
