<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'About me',
  },
  paragraphs: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="resume-section space-y-4">
    <header>
      <h2 class="text-xl font-semibold text-slate-900 dark:text-white">{{ title }}</h2>
    </header>
    <div class="space-y-3 text-base leading-relaxed text-slate-600 dark:text-slate-200">
      <p v-for="(paragraph, index) in paragraphs" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>
