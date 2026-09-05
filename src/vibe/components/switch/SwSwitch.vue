<template>
  <label class="inline-flex cursor-pointer items-center gap-2">
    <span :class="[big ? 'h-8 w-14' : 'h-6 w-10', 'relative inline-block']">
      <input type="checkbox" role="switch" class="peer sr-only" :checked="value" @change="onChange" />
      <span aria-hidden="true"
        :class="[checkedBg[color], 'absolute inset-0 rounded-xl bg-light transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-prim']"></span>
      <span aria-hidden="true"
        :class="[big ? 'h-6 w-6 peer-checked:translate-x-6' : 'h-4 w-4 peer-checked:translate-x-4', 'absolute top-1 left-1 rounded-xl bg-on-light transition-transform duration-300']"></span>
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
type SemanticColor = 'prim' | 'sec' | 'ter' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'semilight' | 'lighter';

withDefaults(defineProps<{
  big?: boolean;
  value: boolean;
  color?: SemanticColor;
}>(), {
  big: false,
  color: 'success',
});

const emit = defineEmits<{
  'update:value': [value: boolean];
}>();

// Full literal class names are required so Tailwind's static scanner generates the utilities.
const checkedBg: Record<SemanticColor, string> = {
  prim: 'peer-checked:bg-prim',
  sec: 'peer-checked:bg-sec',
  ter: 'peer-checked:bg-ter',
  success: 'peer-checked:bg-success',
  warning: 'peer-checked:bg-warning',
  danger: 'peer-checked:bg-danger',
  info: 'peer-checked:bg-info',
  light: 'peer-checked:bg-light',
  semilight: 'peer-checked:bg-semilight',
  lighter: 'peer-checked:bg-lighter',
};

function onChange(event: Event) {
  emit('update:value', (event.target as HTMLInputElement).checked);
}
</script>
