<script setup>
import { RouterLink } from 'vue-router';
import UiButton from './Ui/UiButton.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <section class="resume-section">
    <header class="space-y-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{{ name }}</h1>
        <p class="mt-1 text-lg font-semibold text-accent">{{ role }}</p>
        <p v-if="location" class="mt-1 text-sm text-slate-500 dark:text-slate-300">{{ location }}</p>
      </div>
      <p v-if="summary" class="text-base text-slate-600 dark:text-slate-200">
        {{ summary }}
      </p>
      <RouterLink to="/projects" class="inline-block">
        <UiButton variant="primary">Смотреть проекты</UiButton>
      </RouterLink>
    </header>
  </section>
</template>
