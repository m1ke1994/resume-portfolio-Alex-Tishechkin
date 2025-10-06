<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import UiInput from '../components/Ui/UiInput.vue';
import UiCheckbox from '../components/Ui/UiCheckbox.vue';
import UiTag from '../components/Ui/UiTag.vue';
import UiButton from '../components/Ui/UiButton.vue';
import { useProjectsStore } from '../stores/projects.js';

const projectsStore = useProjectsStore();

onMounted(() => {
  projectsStore.loadProjects();
});

const { filteredProjects, loading, error, availableStacks, availableTags } = storeToRefs(projectsStore);

const searchQuery = computed({
  get: () => projectsStore.searchTerm,
  set: (value) => projectsStore.setSearchTerm(value),
});

const stackFilters = computed(() => projectsStore.stackFilters);
const tagFilters = computed(() => projectsStore.tagFilters);

const handleStackChange = (value, checked) => {
  projectsStore.setStackFilter(value, checked);
};

const handleTagToggle = (tag) => {
  const isActive = tagFilters.value.includes(tag);
  projectsStore.setTagFilter(tag, !isActive);
};

const clearFilters = () => {
  projectsStore.clearFilters();
};
</script>

<template>
  <section aria-labelledby="projects-heading" class="space-y-6">
    <div class="flex flex-col gap-2">
      <h1 id="projects-heading" class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Проекты
      </h1>
      <p class="text-base text-slate-600 dark:text-slate-200">
      Коммерческие и pet-проекты, где отвечал за реализацию клиентской части, оптимизацию интерфейсов и взаимодействие с backend-сервисами.
      </p>
    </div>

    <div class="filter-bar flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-neutral-900 print:hidden">
      <div class="grid gap-4 md:grid-cols-[2fr,3fr]">
        <div>
          <label for="projects-search" class="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Поиск
          </label>
          <UiInput id="projects-search" v-model="searchQuery" placeholder="Поиск по названию или описанию" />
        </div>
        <div>
          <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Технологии
          </p>
          <div class="flex flex-wrap gap-3">
            <UiCheckbox
              v-for="stack in availableStacks"
              :key="stack"
              :label="stack"
              :value="stack"
              :modelValue="stackFilters.includes(stack)"
              @change="({ checked }) => handleStackChange(stack, checked)"
            />
          </div>
        </div>
      </div>
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Теги
        </p>
        <div class="flex flex-wrap gap-3">
          <UiTag
            v-for="tag in availableTags"
            :key="tag"
            :label="tag"
            :active="tagFilters.includes(tag)"
            @click="() => handleTagToggle(tag)"
          />
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <span>
          Найдено: {{ filteredProjects.length }}
        </span>
        <UiButton variant="secondary" @click="clearFilters">Сбросить фильтры</UiButton>
      </div>
    </div>

    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
      {{ error }}
    </div>

    <div v-else-if="loading" class="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-neutral-900">
      Загружаю проекты...
    </div>

    <div v-else>
      <div
        v-if="filteredProjects.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <article
          v-for="project in filteredProjects"
          :key="project.slug"
          class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-neutral-900 dark:shadow-none"
        >
          <RouterLink :to="`/projects/${project.slug}`" class="relative block aspect-video w-full overflow-hidden bg-slate-100">
            <img :src="project.cover" :alt="project.title" class="h-full w-full object-cover transition group-hover:scale-105" />
          </RouterLink>
          <div class="flex flex-1 flex-col gap-4 p-5">
            <div class="space-y-2">
              <RouterLink :to="`/projects/${project.slug}`" class="text-lg font-semibold text-slate-900 transition hover:text-accent dark:text-white">
                {{ project.title }}
              </RouterLink>
              <p class="text-sm text-slate-600 dark:text-slate-200">{{ project.summary }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="stack in project.stack"
                :key="stack"
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:bg-neutral-800 dark:text-slate-300"
              >
                {{ stack }}
              </span>
            </div>
            <div class="mt-auto flex flex-wrap gap-3">
              <UiButton :href="project.previewUrl" target="_blank">Preview</UiButton>
              <UiButton :href="project.repoUrl" target="_blank" variant="secondary">GitHub</UiButton>
              <RouterLink :to="`/projects/${project.slug}`" class="ml-auto text-sm font-semibold text-accent hover:text-accent-muted">
                Подробнее →
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
      <div v-else class="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-neutral-900">
        По заданным фильтрам проектов не найдено. Попробуйте изменить условия поиска.
      </div>
    </div>
  </section>
</template>
