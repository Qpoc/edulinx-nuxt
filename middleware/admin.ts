export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthUserStore();

    if (!authStore.getUser) {
        return abortNavigation();
    }

    if (authStore.getUser) {
        const admins = ['admin', 'super admin'];
        if (authStore.getUser.roles.find((role: any) => admins.includes(role.name.toLowerCase()))) {
            return;
        }
    }

    return abortNavigation();

});