<template>
  <div>
    <button class="mt-3 btn primary" @click="count++; popMsg()">count is: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { msg } from '@/services/notify';

defineProps({
  msg: {
    type: String,
    required: true,
  }
});
const count = ref(0);

function popMsg() {
  msg.info("Counter", `Count is ${count.value}`)
}
</script>
