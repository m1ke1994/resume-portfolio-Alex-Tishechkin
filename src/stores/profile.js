import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    loading: false,
    error: null,
  }),
  actions: {
    async loadProfile() {
      if (this.profile || this.loading) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(new URL('../data/profile.json', import.meta.url));
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        const data = await response.json();
        this.profile = {
          ...data,
          avatarUrl: new URL(data.avatar, import.meta.url).href,
        };
      } catch (error) {
        this.error = 'Не удалось загрузить профиль';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
