<template>
    <input type="text" :value="modelValue"
        class="block w-full rounded border bg-background p-2 text-sm text-on-background outline-none focus:border-prim"
        @input="onInput" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    modelValue?: string;
}>(), {
    modelValue: '',
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

function onInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>
