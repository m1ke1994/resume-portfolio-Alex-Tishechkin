import { defineStore } from 'pinia';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false,
    error: null,
    searchTerm: '',
    stackFilters: [],
    tagFilters: [],
  }),
  getters: {
    availableStacks(state) {
      const stacks = new Set();
      state.projects.forEach((project) => {
        project.stack.forEach((item) => stacks.add(item));
      });
      return Array.from(stacks).sort((a, b) => a.localeCompare(b, 'ru'));
    },
    availableTags(state) {
      const tags = new Set();
      state.projects.forEach((project) => {
        (project.tags || []).forEach((tag) => tags.add(tag));
      });
      return Array.from(tags).sort((a, b) => a.localeCompare(b, 'ru'));
    },
    filteredProjects(state) {
      const search = state.searchTerm.trim().toLowerCase();
      return state.projects.filter((project) => {
        const matchesSearch = !search
          || project.title.toLowerCase().includes(search)
          || project.summary.toLowerCase().includes(search);

        const matchesStacks = !state.stackFilters.length
          || state.stackFilters.every((stack) => project.stack.includes(stack));

        const matchesTags = !state.tagFilters.length
          || state.tagFilters.every((tag) => (project.tags || []).includes(tag));

        return matchesSearch && matchesStacks && matchesTags;
      });
    },
  },
  actions: {
    async loadProjects() {
      if (this.projects.length || this.loading) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(new URL('../data/projects.json', import.meta.url));
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        const data = await response.json();
        this.projects = data.projects;
      } catch (error) {
        this.error = 'Не удалось загрузить проекты';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    setSearchTerm(value) {
      this.searchTerm = value;
    },
    toggleStackFilter(value) {
      if (this.stackFilters.includes(value)) {
        this.stackFilters = this.stackFilters.filter((item) => item !== value);
      } else {
        this.stackFilters = [...this.stackFilters, value];
      }
    },
    toggleTagFilter(value) {
      if (this.tagFilters.includes(value)) {
        this.tagFilters = this.tagFilters.filter((item) => item !== value);
      } else {
        this.tagFilters = [...this.tagFilters, value];
      }
    },
    setStackFilter(value, checked) {
      if (checked) {
        if (!this.stackFilters.includes(value)) {
          this.stackFilters = [...this.stackFilters, value];
        }
      } else {
        this.stackFilters = this.stackFilters.filter((item) => item !== value);
      }
    },
    setTagFilter(value, checked) {
      if (checked) {
        if (!this.tagFilters.includes(value)) {
          this.tagFilters = [...this.tagFilters, value];
        }
      } else {
        this.tagFilters = this.tagFilters.filter((item) => item !== value);
      }
    },
    clearFilters() {
      this.searchTerm = '';
      this.stackFilters = [];
      this.tagFilters = [];
    },
    getProjectBySlug(slug) {
      return this.projects.find((project) => project.slug === slug);
    },
  },
});
