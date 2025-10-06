<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const route = useRoute();
const storageKey = 'resume-theme-preference';
const themePreference = ref(localStorage.getItem(storageKey) || 'system');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const isSystemDark = ref(prefersDark.matches);
const mobileNav = ref(null);

const isDark = computed(() => {
  if (themePreference.value === 'dark') {
    return true;
  }
  if (themePreference.value === 'light') {
    return false;
  }
  return isSystemDark.value;
});

const applyTheme = () => {
  const root = document.documentElement;
  if (isDark.value) {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
};

const handleSystemChange = (event) => {
  isSystemDark.value = event.matches;
};

watch(themePreference, (value) => {
  localStorage.setItem(storageKey, value);
  applyTheme();
});

watch(isDark, () => {
  applyTheme();
});

onMounted(() => {
  prefersDark.addEventListener('change', handleSystemChange);
  applyTheme();
});

onBeforeUnmount(() => {
  prefersDark.removeEventListener('change', handleSystemChange);
});

const setTheme = (value) => {
  themePreference.value = value;
};

const themeOptions = [
  { label: 'Системная', value: 'system' },
  { label: 'Светлая', value: 'light' },
  { label: 'Тёмная', value: 'dark' },
];

const isActive = (path) => {
  if (path === '/projects') {
    return route.path.startsWith('/projects');
  }
  return route.path === path;
};

const openMobileNav = () => {
  if (mobileNav.value) {
    mobileNav.value.showModal();
  }
};

const closeMobileNav = () => {
  if (mobileNav.value) {
    mobileNav.value.close();
  }
};
</script>

<template>
  <div class="min-h-screen bg-surface text-base-content transition-colors dark:bg-surface-dark dark:text-slate-100">
    <header class="print-hidden border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-700/60 dark:bg-neutral-900/80">
      <div class="container flex items-center justify-between py-4">
        <RouterLink to="/" class="text-lg font-semibold tracking-tight dark:text-white">
          Александр Тишечкин
        </RouterLink>
        <nav class="hidden items-center gap-6 text-sm font-medium md:flex">
          <RouterLink
            to="/"
            class="transition-colors"
            :class="isActive('/') ? 'text-accent' : 'text-slate-500 dark:text-slate-300 hover:text-accent'"
          >
            Резюме
          </RouterLink>
          <RouterLink
            to="/projects"
            class="transition-colors"
            :class="isActive('/projects') ? 'text-accent' : 'text-slate-500 dark:text-slate-300 hover:text-accent'"
          >
            Проекты
          </RouterLink>
        </nav>
        <div class="flex items-center gap-3">
          <label class="sr-only" for="theme-switcher">Переключение темы</label>
          <select
            id="theme-switcher"
            class="theme-toggle rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-slate-600 shadow-sm transition hover:border-accent focus:border-accent focus:outline-none dark:border-slate-700 dark:bg-neutral-800 dark:text-slate-300"
            :value="themePreference"
            @change="setTheme($event.target.value)"
          >
            <option v-for="option in themeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <button
            class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden dark:border-slate-700 dark:bg-neutral-800 dark:text-slate-300"
            type="button"
            aria-label="Открыть навигацию"
            @click="openMobileNav"
          >
            <span class="text-xs font-semibold">Меню</span>
          </button>
        </div>
      </div>
    </header>

    <main class="container py-6 md:py-10">
      <RouterView />
    </main>

    <dialog ref="mobileNav" class="print-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-neutral-900">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-300">Навигация</span>
        <button
          type="button"
          class="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-slate-700 dark:text-slate-300"
          @click="closeMobileNav"
        >
          Закрыть
        </button>
      </div>
      <div class="mt-4 flex flex-col gap-4 text-sm">
        <RouterLink
          to="/"
          class="rounded-lg bg-slate-100 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-neutral-800 dark:text-slate-200"
          @click="closeMobileNav"
        >
          Резюме
        </RouterLink>
        <RouterLink
          to="/projects"
          class="rounded-lg bg-slate-100 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-neutral-800 dark:text-slate-200"
          @click="closeMobileNav"
        >
          Проекты
        </RouterLink>
      </div>
    </dialog>
  </div>
</template>
