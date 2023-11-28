// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['nuxt-primevue', '@vee-validate/nuxt', 'nuxt-viewport', ['@pinia/nuxt', {autoImports: ['defineStore', 'acceptHMRUpdate']}]],
	css: ['primevue/resources/themes/lara-light-indigo/theme.css', 'primeflex/primeflex.css', 'primeicons/primeicons.css'],
	runtimeConfig: {
		public: {
			apiUrl: process.env.API_URL,
		},
	},
	imports: {
		dirs: ['stores']
	},
});
