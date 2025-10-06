<script setup>
import UiProgress from './Ui/UiProgress.vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-6 rounded-2xl bg-sidebar px-6 py-8 text-white shadow-xl dark:bg-neutral-900">
    <div class="flex flex-col items-center text-center">
      <img
        v-if="profile.avatarUrl"
        :src="profile.avatarUrl"
        alt="Аватар"
        class="h-28 w-28 rounded-full border-4 border-white/20 object-cover"
      />
      <h2 class="mt-4 text-xl font-semibold">{{ profile.name }}</h2>
      <p class="mt-1 text-sm text-white/60">{{ profile.role }}</p>
    </div>

    <section class="sidebar-section">
      <h3 class="sidebar-title">Контакты</h3>
      <ul class="space-y-3 text-sm">
        <li v-for="(contact, index) in profile.contacts" :key="index" class="space-y-1">
          <p class="text-xs font-semibold uppercase tracking-widest text-white/50">{{ contact.type }}</p>
          <a :href="contact.href" class="break-words text-white underline-offset-4 hover:underline">
            {{ contact.value }}
          </a>
        </li>
      </ul>
    </section>

    <section class="sidebar-section">
      <h3 class="sidebar-title">Образование</h3>
      <ul class="space-y-4 text-sm">
        <li v-for="(item, index) in profile.education" :key="index">
          <p class="font-semibold text-white">{{ item.institution }}</p>
          <p class="text-white/70">{{ item.degree }}</p>
          <p class="text-white/70">{{ item.qualification }}</p>
          <p class="text-xs uppercase tracking-widest text-white/40">{{ item.period }}</p>
        </li>
      </ul>
    </section>

    <section class="sidebar-section">
      <h3 class="sidebar-title">Навыки</h3>
      <div class="space-y-4">
        <UiProgress
          v-for="(skill, index) in profile.skills"
          :key="index"
          :label="skill.title"
          :value="skill.level"
        />
      </div>
    </section>

    <section class="sidebar-section">
      <h3 class="sidebar-title">Языки</h3>
      <ul class="space-y-2 text-sm">
        <li v-for="(language, index) in profile.languages" :key="index" class="flex items-center justify-between text-white/80">
          <span>{{ language.title }}</span>
          <span class="text-xs uppercase tracking-widest text-white/50">{{ language.level }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
