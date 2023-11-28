import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore({
	id: 'auth-user-store',
	state: () => {
		return {
			user: null,
		};
	},
	actions: {
		addUser(user: any) {
			this.user = user;
		},
		async fetchUser() {
			const { data, error } = await useRequest('me');

			if (data.value) {
				this.user = data.value;
			}
		},
	},
	getters: {
		getUser(state) {
			return state.user;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot));
}
