<template>
    <div :class="wrapperClass">
        <input type="text" inputmode="decimal" role="spinbutton" autocomplete="off"
            :id="inputId" :value="text"
            class="h-full w-full min-w-0 bg-transparent outline-none" :class="sizes[size].input"
            :aria-valuemin="min" :aria-valuemax="max" :aria-valuenow="modelValue"
            @input="onInput" @focus="focused = true" @blur="commit" @keydown="onKeydown" />
        <div v-if="showButtons" :class="buttonsClass">
            <button type="button" aria-label="Increment"
                class="flex flex-1 cursor-pointer select-none items-center justify-center text-[10px] font-bold leading-none text-on-lighter hover:bg-semilight" @click="nudge(1)">+</button>
            <button type="button" aria-label="Decrement"
                class="flex flex-1 cursor-pointer select-none items-center justify-center text-[10px] font-bold leading-none text-on-lighter hover:bg-semilight" @click="nudge(-1)">-</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

type Size = 'small' | 'medium' | 'large';

const props = withDefaults(defineProps<{
    modelValue?: number | null;
    min?: number;
    max?: number;
    step?: number;
    showButtons?: boolean;
    buttonLayout?: 'horizontal' | 'vertical';
    size?: Size;
    fluid?: boolean;
    inputId?: string;
}>(), {
    modelValue: null,
    min: undefined,
    max: undefined,
    step: 1,
    showButtons: false,
    buttonLayout: 'vertical',
    size: 'medium',
    fluid: false,
});

// Only finite numbers are ever emitted (commit/nudge always clamp+snap), so the
// v-model write side stays assignable to `number | undefined` targets.
const emit = defineEmits<{
    'update:modelValue': [value: number];
    valueChange: [value: number];
}>();

// Full literal class names are required so Tailwind's static scanner generates the utilities.
const sizes: Record<Size, { wrapper: string; input: string }> = {
    small: { wrapper: 'h-6 text-xs', input: 'px-1' },
    medium: { wrapper: 'h-8 text-sm', input: 'px-2' },
    large: { wrapper: 'h-10 text-base', input: 'px-2' },
};

const wrapperClass = computed(() => [
    props.fluid ? 'flex w-full' : 'inline-flex',
    'items-stretch overflow-hidden rounded border border-lighter bg-background text-on-background focus-within:border-prim',
    sizes[props.size].wrapper,
]);

// DOM order is always + then -; the horizontal layout flips the row to show - first.
const buttonsClass = computed(() => [
    'flex shrink-0 border-l border-lighter bg-lighter',
    props.buttonLayout === 'vertical' ? 'w-4 flex-col' : 'w-8 flex-row-reverse',
]);

const text = ref(format(props.modelValue));
const focused = ref(false);

// Keep the field in sync with external model changes while it is not being edited.
watch(() => props.modelValue, (value) => {
    if (!focused.value) text.value = format(value);
});

function format(value: number | null | undefined): string {
    return value == null ? '' : String(value);
}

// Round to the nearest multiple of `step` anchored at `min`, fixing float noise.
function snap(value: number): number {
    if (!props.step || props.step <= 0) return value;
    const base = props.min ?? 0;
    const snapped = base + Math.round((value - base) / props.step) * props.step;
    return parseFloat(snapped.toPrecision(12));
}

function clamp(value: number): number {
    return Math.min(props.max ?? Infinity, Math.max(props.min ?? -Infinity, value));
}

function setModel(value: number) {
    emit('update:modelValue', value);
    emit('valueChange', value);
}

function onInput(event: Event) {
    text.value = (event.target as HTMLInputElement).value;
}

// Commit what was typed; empty or invalid input reverts to the model value.
function commit() {
    focused.value = false;
    const raw = text.value.trim();
    const parsed = Number(raw);
    if (raw === '' || !isFinite(parsed)) {
        text.value = format(props.modelValue);
        return;
    }
    const value = clamp(snap(parsed));
    text.value = format(value);
    setModel(value);
}

// Base the next step on what is currently shown, since props may not have caught up yet.
function currentValue(): number {
    const raw = text.value.trim();
    const parsed = Number(raw);
    if (raw !== '' && isFinite(parsed)) return clamp(snap(parsed));
    return props.modelValue ?? props.min ?? 0;
}

function nudge(direction: 1 | -1) {
    const step = props.step || 1;
    const value = clamp(snap(currentValue() + direction * step));
    text.value = format(value);
    setModel(value);
}

function onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') { event.preventDefault(); nudge(1); }
    else if (event.key === 'ArrowDown') { event.preventDefault(); nudge(-1); }
    else if (event.key === 'Enter') commit();
    else if (event.key === 'Escape') text.value = format(props.modelValue);
}
</script>
