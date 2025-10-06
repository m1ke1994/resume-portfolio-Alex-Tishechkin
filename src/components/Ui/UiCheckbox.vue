<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const onChange = (event) => {
  emit('update:modelValue', event.target.checked);
  emit('change', {
    checked: event.target.checked,
    value: props.value,
  });
};
</script>

<template>
  <label class="group flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
    <span class="relative inline-flex h-5 w-5 items-center justify-center rounded border border-slate-300 bg-white transition group-hover:border-accent dark:border-slate-600 dark:bg-neutral-900">
      <input
        :id="id"
        :name="name"
        :value="value"
        type="checkbox"
        class="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
        :checked="modelValue"
        @change="onChange"
      />
      <span class="pointer-events-none text-xs font-semibold text-accent opacity-0 transition peer-checked:opacity-100">✓</span>
    </span>
    <span>{{ label }}</span>
  </label>
</template>
