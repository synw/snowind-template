<template>
  <Teleport to="body">
    <div v-if="visible" ref="panel" role="dialog"
      class="fixed z-1000 w-max max-h-[calc(100vh-8rem)] overflow-y-auto rounded-md border border-semilight background p-3 shadow-lg"
      :style="{ top: pos.top + 'px', left: pos.left + 'px' }">
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';

const emit = defineEmits<{ hide: [] }>();

const visible = ref(false);
const panel = ref<HTMLElement | null>(null);
const pos = reactive({ top: 0, left: 0 });
let anchor: HTMLElement | null = null;

function place() {
  if (!anchor) return;
  const rect = anchor.getBoundingClientRect();
  const width = panel.value?.offsetWidth ?? 320;
  const height = panel.value?.offsetHeight ?? 200;
  pos.left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
  pos.top = rect.bottom + 6;
  if (pos.top + height > window.innerHeight - 8) {
    pos.top = Math.max(8, rect.top - height - 6); // flip above the trigger
  }
}

function show(event?: Event) {
  const target = event?.currentTarget;
  if (target instanceof HTMLElement) anchor = target;
  if (!anchor) return;
  visible.value = true;
  const rect = anchor.getBoundingClientRect();
  pos.top = rect.bottom + 6; // initial guess, refined after render
  pos.left = rect.left;
  nextTick(place);
}

function hide() {
  if (!visible.value) return;
  visible.value = false;
  emit('hide');
}

function toggle(event?: Event) {
  if (visible.value) hide();
  else show(event);
}

function onMouseDown(e: MouseEvent) {
  if (!visible.value) return;
  const target = e.target as Node;
  if (panel.value?.contains(target) || anchor?.contains(target)) return;
  hide();
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') hide();
}

onMounted(() => {
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('keydown', onKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onMouseDown);
  document.removeEventListener('keydown', onKeyDown);
});

defineExpose({ show, hide, toggle });
</script>
