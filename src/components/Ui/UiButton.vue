<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  href: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'button',
  },
  target: {
    type: String,
    default: null,
  },
  rel: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition';

const variants = {
  primary:
    'bg-accent text-white hover:text-white shadow-sm hover:bg-accent-muted focus-visible:outline-accent disabled:opacity-60 disabled:cursor-not-allowed',
  secondary:
    'border border-slate-200 bg-white text-slate-700 hover:border-accent hover:text-accent focus-visible:outline-accent dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200',
  ghost:
    'text-slate-600 hover:text-accent focus-visible:outline-accent dark:text-slate-300',
};

const tagName = computed(() => (props.href ? 'a' : 'button'));
const roleAttr = computed(() => (props.href ? null : 'button'));
const relAttr = computed(() => {
  if (props.rel) {
    return props.rel;
  }
  if (props.target === '_blank') {
    return 'noopener noreferrer';
  }
  return null;
});
</script>

<template>
  <component
    :is="tagName"
    :href="href"
    :type="tagName === 'button' ? type : null"
    :target="target"
    :rel="relAttr"
    :disabled="tagName === 'button' ? disabled : null"
    :aria-disabled="tagName !== 'button' ? disabled : null"
    :role="tagName !== 'button' ? roleAttr : null"
    class="ui-button"
    :class="[baseClasses, variants[variant] || variants.primary]"
  >
    <slot />
  </component>
</template>
