<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">Components</h1>
    <p class="text-sm text-semilight mb-12">
      Live, interactive demos of every Sw-* component in the kit — each section is wired to real state.
    </p>

    <!-- SwInputText -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwInputText</h2>
      <p class="text-sm text-semilight mb-4">A plain text input with two-way binding.</p>
      <div class="border border-light rounded-lg p-4 max-w-md">
        <SwInputText v-model="textInput" placeholder="Type something…" />
        <p class="mt-3 text-sm">Current value: <code>"{{ textInput }}"</code></p>
      </div>
    </section>

    <!-- SwInputNumber -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwInputNumber</h2>
      <p class="text-sm text-semilight mb-4">Numeric input with increment/decrement buttons, min 0, max 99.</p>
      <div class="border border-light rounded-lg p-4 max-w-md">
        <SwInputNumber v-model="numberValue" :min="0" :max="99" :step="1" show-buttons button-layout="horizontal" size="large" fluid />
        <p class="mt-3 text-sm">Current value: <code>{{ numberValue }}</code></p>
      </div>
    </section>

    <!-- SwTextarea -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwTextarea</h2>
      <p class="text-sm text-semilight mb-4">A multi-line textarea that autosizes with its content.</p>
      <div class="border border-light rounded-lg p-4 max-w-md">
        <SwTextarea v-model="note" :rows="3" auto-resize placeholder="Write a note…" />
        <p class="mt-3 text-sm">{{ note.length }} characters</p>
      </div>
    </section>

    <!-- SwSwitch -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwSwitch</h2>
      <p class="text-sm text-semilight mb-4">A toggle switch bound to a boolean ref.</p>
      <div class="border border-light rounded-lg p-4 max-w-md">
        <SwSwitch :value="switchOn" color="prim" @update:value="switchOn = $event">Notifications</SwSwitch>
        <p class="mt-3 text-sm">State: <code>{{ switchOn ? 'on' : 'off' }}</code></p>
      </div>
    </section>

    <!-- SwTooltip -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwTooltip</h2>
      <p class="text-sm text-semilight mb-4">Hover (or keyboard-focus) the button to reveal the tooltip.</p>
      <div class="border border-light rounded-lg p-4 max-w-md flex items-center gap-4">
        <SwTooltip text="Tooltips explain controls without taking space.">
          <button type="button" class="btn">Hover me</button>
        </SwTooltip>
      </div>
    </section>

    <!-- SwPopover -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwPopover</h2>
      <p class="text-sm text-semilight mb-4">
        A click-triggered panel teleported to the body. Click outside or press Escape to dismiss; the <code>hide</code> emit updates the state line below.
      </p>
      <div class="border border-light rounded-lg p-4 max-w-md">
        <button type="button" class="btn" @click="openPopover($event)">Open Popover</button>
        <SwPopover ref="popoverRef" @hide="popoverState = 'closed'">
          <div class="space-y-2 text-sm">
            <p>Popover content, positioned next to its trigger.</p>
            <button type="button" class="btn light" @click="closePopover()">Close via hide()</button>
          </div>
        </SwPopover>
        <p class="mt-3 text-sm">State: <code>{{ popoverState }}</code></p>
      </div>
    </section>

    <!-- SwTree -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwTree</h2>
      <p class="text-sm text-semilight mb-4">An expandable tree with a per-node slot and a search filter. Click a node to select it.</p>
      <div class="border border-light rounded-lg p-4 max-w-md">
        <SwTree :nodes="treeNodes" @node-select="selectedNode = $event">
          <template #default="{ node }">
            {{ node.label }}
            <span v-if="node.children?.length" class="text-xs text-semilight">({{ node.children.length }})</span>
          </template>
        </SwTree>
        <p class="mt-3 text-sm">Selected: <code>{{ selectedNode ? selectedNode.key : 'none' }}</code></p>
      </div>
    </section>

    <!-- SwListbox -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwListbox</h2>
      <p class="text-sm text-semilight mb-4">A selectable list; clicking the selected option again clears it (toggle behavior).</p>
      <div class="border border-light rounded-lg p-4 max-w-xs">
        <SwListbox :options="fruitOptions" v-model="selectedFruit" />
        <p class="mt-3 text-sm">Selected: <code>{{ selectedFruit ?? 'none' }}</code></p>
      </div>
    </section>

    <!-- SwIftaLabel -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwIftaLabel</h2>
      <p class="text-sm text-semilight mb-4">A floating label wrapper here decorating a SwInputText.</p>
      <div class="border border-light rounded-lg p-4 max-w-md">
        <SwIftaLabel label="Email" label-for="playground-email">
          <SwInputText id="playground-email" v-model="email" />
        </SwIftaLabel>
        <p class="mt-3 text-sm">Current value: <code>"{{ email }}"</code></p>
      </div>
    </section>

    <!-- Toast -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">Toast</h2>
      <p class="text-sm text-semilight mb-4">Fire global toasts via the <code>toast</code> composable — they appear at the bottom of the viewport and auto-dismiss.</p>
      <div class="border border-light rounded-lg p-4 flex flex-wrap gap-3">
        <button type="button" class="btn success" @click="toast.success('Operation completed successfully.')">Success toast</button>
        <button type="button" class="btn warning" @click="toast.warning('Storage is almost full (87% used).')">Warning toast</button>
        <button type="button" class="btn danger" @click="toast.error('Connection lost — retrying…')">Error toast</button>
      </div>
    </section>

    <!-- Notification -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">Notification</h2>
      <p class="text-sm text-semilight mb-4">
        Add items to the global notification center (top-right) via <code>addNotification()</code>. Active notifications are listed below with manual removal.
      </p>
      <div class="border border-light rounded-lg p-4 max-w-md space-y-3">
        <button type="button" class="btn" @click="pushNotification()">Add notification</button>
        <ul v-if="notifications.length" class="m-0 list-none p-0 space-y-1 text-sm">
          <li v-for="n in notifications" :key="n.id" class="flex items-center justify-between gap-2 border border-light rounded px-2 py-1">
            <span>{{ n.title }}</span>
            <button type="button" class="btn light text-xs" @click="removeNotification(n.id)">Remove</button>
          </li>
        </ul>
        <p v-else class="text-sm text-semilight">No active notifications.</p>
      </div>
    </section>

    <!-- SwConfirmDialog -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-2 border-b border-lighter pb-2">SwConfirmDialog</h2>
      <p class="text-sm text-semilight mb-4">Open a modal confirm dialog via the <code>requireConfirmation()</code> composable.</p>
      <div class="border border-light rounded-lg p-4 max-w-md">
        <button type="button" class="btn danger" @click="askConfirm()">Delete item…</button>
        <p class="mt-3 text-sm">Result: <code>{{ confirmResult || '—' }}</code></p>
      </div>
    </section>

    <!-- Global confirm dialog (singleton — one instance app-wide) -->
    <SwConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SwInputText from '@/vibe/components/inputtext/SwInputText.vue';
import SwInputNumber from '@/vibe/components/inputnumber/SwInputNumber.vue';
import SwTextarea from '@/vibe/components/textarea/SwTextarea.vue';
import SwSwitch from '@/vibe/components/switch/SwSwitch.vue';
import SwTooltip from '@/vibe/components/tooltip/SwTooltip.vue';
import SwPopover from '@/vibe/components/popover/SwPopover.vue';
import SwTree from '@/vibe/components/tree/SwTree.vue';
import SwListbox from '@/vibe/components/listbox/SwListbox.vue';
import SwIftaLabel from '@/vibe/components/iftalabel/SwIftaLabel.vue';
import SwConfirmDialog from '@/vibe/components/confirm/SwConfirmDialog.vue';
import { toast } from '@/vibe/components/toast/composable.js';
import { notifications, addNotification, removeNotification } from '@/vibe/components/notification/composable.js';
import { requireConfirmation } from '@/vibe/components/confirm/composable.js';

// SwInputText / SwTextarea
const textInput = ref('');
const note = ref('');

// SwInputNumber
const numberValue = ref(10);

// SwSwitch
const switchOn = ref(false);

// SwPopover
const popoverRef = ref<InstanceType<typeof SwPopover> | null>(null);
const popoverState = ref<'open' | 'closed'>('closed');
function openPopover(event: MouseEvent) {
  popoverState.value = 'open';
  popoverRef.value?.show(event);
}
function closePopover() {
  popoverRef.value?.hide();
}

// SwTree
const treeNodes = [
  {
    key: 'docs',
    label: 'Documents',
    children: [
      { key: 'reports', label: 'Reports' },
      { key: 'invoices', label: 'Invoices' },
    ],
  },
  { key: 'photos', label: 'Photos' },
  { key: 'music', label: 'Music' },
];
const selectedNode = ref<{ key: string } | null>(null);

// SwListbox
const fruitOptions = ['Apple', 'Banana', 'Cherry', 'Grape'];
const selectedFruit = ref<string | null>(null);

// SwIftaLabel
const email = ref('');

// Notification
function pushNotification() {
  addNotification({
    severity: 'info',
    title: 'New notification',
    detail: 'Pushed via the addNotification() composable.',
    life: 8000,
  });
}

// SwConfirmDialog
const confirmResult = ref('');
function askConfirm() {
  requireConfirmation({
    title: 'Delete this item?',
    message: 'This action cannot be undone. The demo item will be permanently removed.',
    accept: async () => { confirmResult.value = 'accepted'; },
    reject: async () => { confirmResult.value = 'cancelled'; },
  });
}
</script>
