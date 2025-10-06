<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import SidebarProfile from '../components/SidebarProfile.vue';
import ResumeHeader from '../components/ResumeHeader.vue';
import AboutBlock from '../components/AboutBlock.vue';
import ExperienceTimeline from '../components/ExperienceTimeline.vue';
import { useProfileStore } from '../stores/profile.js';

const profileStore = useProfileStore();
onMounted(() => {
  profileStore.loadProfile();
});

const { profile, loading, error } = storeToRefs(profileStore);
const mobileSidebarOpen = ref(false);

const handleToggle = (event) => {
  mobileSidebarOpen.value = event.target.open;
};
</script>

<template>
  <section aria-labelledby="resume-heading" class="space-y-6">
    <h1 id="resume-heading" class="sr-only">Резюме</h1>

    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
      {{ error }}
    </div>

    <div v-else-if="loading" class="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-neutral-900">
      Загружаю данные профиля...
    </div>

    <div v-else-if="profile" class="layout-grid">
      <div class="md:sticky md:top-24 md:h-fit">
        <aside class="hidden md:block print:block">
          <SidebarProfile :profile="profile" />
        </aside>

        <details class="md:hidden print:hidden" :open="mobileSidebarOpen" @toggle="handleToggle">
          <summary class="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm marker:content-none dark:border-slate-700 dark:bg-neutral-900 dark:text-slate-200">
            <span>Профиль</span>
            <span class="text-xs uppercase tracking-widest text-slate-400">
              {{ mobileSidebarOpen ? 'скрыть' : 'открыть' }}
            </span>
          </summary>
          <div class="mt-4">
            <SidebarProfile :profile="profile" />
          </div>
        </details>
      </div>

      <div class="flex flex-col gap-6">
        <ResumeHeader
          :name="profile.name"
          :role="profile.role"
          :summary="profile.summary"
          :location="profile.location"
        />

        <AboutBlock title="Обо мне" :paragraphs="profile.about" />

        <ExperienceTimeline title="Опыт" :items="profile.experience" />
      </div>
    </div>
  </section>
</template>
