<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import UiButton from '../components/Ui/UiButton.vue';
import UiTag from '../components/Ui/UiTag.vue';
import { useProjectsStore } from '../stores/projects.js';

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const projectsStore = useProjectsStore();

onMounted(() => {
  projectsStore.loadProjects();
});

const { loading, error } = storeToRefs(projectsStore);

const project = computed(() => projectsStore.getProjectBySlug(props.slug));
const imageIndex = ref(0);

watch(project, (value) => {
  if (value) {
    imageIndex.value = 0;
  }
});

const gallery = computed(() => {
  if (!project.value) {
    return [];
  }
  return project.value.gallery && project.value.gallery.length
    ? project.value.gallery
    : [project.value.cover];
});

const currentImage = computed(() => gallery.value[imageIndex.value] || null);

const hasMultipleImages = computed(() => gallery.value.length > 1);

const showPrev = () => {
  if (!hasMultipleImages.value) return;
  imageIndex.value = (imageIndex.value - 1 + gallery.value.length) % gallery.value.length;
};

const showNext = () => {
  if (!hasMultipleImages.value) return;
  imageIndex.value = (imageIndex.value + 1) % gallery.value.length;
};
</script>

<template>
  <section aria-labelledby="project-heading" class="space-y-6">
    <RouterLink to="/projects" class="print-hidden inline-flex items-center text-sm font-semibold text-accent hover:text-accent-muted">
      ← Назад к списку
    </RouterLink>

    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
      {{ error }}
    </div>

    <div v-else-if="loading && !project" class="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-neutral-900">
      Загружаю проект...
    </div>

    <div v-else-if="!project" class="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-neutral-900">
      Проект не найден. Проверьте ссылку или вернитесь к списку проектов.
    </div>

    <div v-else class="space-y-8">
      <header class="space-y-4">
        <h1 id="project-heading" class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {{ project.title }}
        </h1>
        <p class="text-base text-slate-600 dark:text-slate-200">{{ project.description }}</p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="stack in project.stack"
            :key="stack"
            class="rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white dark:bg-slate-700"
          >
            {{ stack }}
          </span>
        </div>
      </header>

      <div class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card dark:border-slate-700 dark:bg-neutral-900">
        <img
          v-if="currentImage"
          :src="currentImage"
          :alt="project.title"
          class="h-full w-full object-cover"
        />
        <button
          v-if="hasMultipleImages"
          type="button"
          class="print-hidden absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent hover:bg-white dark:bg-neutral-800/90 dark:text-slate-200"
          @click="showPrev"
          aria-label="Предыдущее изображение"
        >
          ←
        </button>
        <button
          v-if="hasMultipleImages"
          type="button"
          class="print-hidden absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent hover:bg-white dark:bg-neutral-800/90 dark:text-slate-200"
          @click="showNext"
          aria-label="Следующее изображение"
        >
          →
        </button>
        <div v-if="hasMultipleImages" class="print-hidden absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          <span
            v-for="(image, index) in gallery"
            :key="index"
            class="h-2 w-8 rounded-full"
            :class="index === imageIndex ? 'bg-accent' : 'bg-white/60 dark:bg-neutral-700'"
            aria-hidden="true"
          ></span>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <section class="resume-section space-y-4">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Что сделано</h2>
          <p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">{{ project.summary }}</p>
          <div class="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-300">
            <UiTag v-for="tag in project.tags" :key="tag" :label="tag" :interactive="false" />
          </div>
        </section>

        <aside class="resume-section space-y-4">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Ссылки</h2>
          <div class="flex flex-col gap-3">
            <UiButton :href="project.previewUrl" target="_blank">Открыть демо</UiButton>
            <UiButton :href="project.repoUrl" target="_blank" variant="secondary">Открыть GitHub</UiButton>
          </div>
        </aside>
      </div>

      <section class="resume-section space-y-4">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Чему научился</h2>
        <ul class="list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-600 dark:text-slate-200">
          <li v-for="(item, index) in project.learned" :key="index">{{ item }}</li>
        </ul>
      </section>
    </div>
  </section>
</template>
