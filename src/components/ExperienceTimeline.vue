<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Опыт',
  },
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="resume-section space-y-6">
    <header>
      <h2 class="text-xl font-semibold text-slate-900 dark:text-white">{{ title }}</h2>
    </header>
    <div class="relative pl-6">
      <div class="timeline absolute left-0 top-0 h-full"></div>
      <div class="space-y-8">
        <article
          v-for="(item, index) in items"
          :key="index"
          class="timeline-item relative pl-6"
        >
          <div class="space-y-2">
            <div class="flex flex-col gap-1">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ item.role }}</h3>
              <p class="text-sm font-medium text-accent">{{ item.company }}</p>
              <p class="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-400">
                {{ item.period }}
              </p>
            </div>
            <ul class="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-200">
              <li v-for="(achievement, idx) in item.achievements" :key="idx">
                {{ achievement }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
