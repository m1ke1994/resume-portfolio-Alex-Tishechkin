<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const normalized = computed(() => {
  if (props.value < 0) return 0;
  if (props.value > 100) return 100;
  return props.value;
});
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-200">
      <span>{{ label }}</span>
      <span>{{ normalized }}%</span>
    </div>
    <div
      class="h-2 rounded-full bg-slate-600/40 dark:bg-slate-700"
      role="progressbar"
      :aria-valuenow="normalized"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="label"
    >
      <div class="h-full rounded-full bg-accent" :style="{ width: `${normalized}%` }"></div>
    </div>
  </div>
</template>
