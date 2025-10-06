<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  interactive: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['click']);

const classes = computed(() => [
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  props.active
    ? 'border-accent bg-accent/10 text-accent focus-visible:outline-accent'
    : 'border-slate-200 bg-white text-slate-500 hover:border-accent hover:text-accent focus-visible:outline-accent dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-300',
  !props.interactive && 'cursor-default hover:border-slate-200 hover:text-slate-500 dark:hover:border-slate-700 dark:hover:text-slate-300',
]);

const tagName = computed(() => (props.interactive ? 'button' : 'span'));
const typeAttr = computed(() => (props.interactive ? 'button' : null));

const handleClick = (event) => {
  if (!props.interactive) {
    return;
  }
  event.preventDefault();
  emit('click');
};
</script>

<template>
  <component
    :is="tagName"
    :type="typeAttr"
    class="ui-tag"
    :class="classes"
    :aria-pressed="interactive ? active : null"
    @click="handleClick"
  >
    {{ label }}
  </component>
</template>
