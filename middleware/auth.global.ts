export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthUserStore();
	const token = useCookie('token');

	if (!authStore.getUser && token.value) {
		await authStore.fetchUser();
	}
});
