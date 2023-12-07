export default defineNuxtRouteMiddleware((to, from) => {
	const userAuthStore = useAuthUserStore();
	const excludedRoutes = ['index'];
    const invitationRoutes = ['course-invitation']

    if (invitationRoutes.includes(to.name)) {
        return;
    }

	if (userAuthStore.getUser && excludedRoutes.includes(to.name)) {
		return navigateTo({ name: 'home' });
	}

	if (!excludedRoutes.includes(to.name)) {
		if (!userAuthStore.getUser) {
			return navigateTo({ name: 'index' });
		}
	}
});
