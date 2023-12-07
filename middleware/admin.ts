export default defineNuxtRouteMiddleware((to, from) => {
    const authStore:any = useAuthUserStore();

    if (!authStore.getUser) {
        return abortNavigation();
    }

    if (authStore.getUser) {
        const admins = ['admin', 'super admin'];
        if (admins.includes(authStore.getUser?.current_role?.name?.toLowerCase())) {
            return;
        }
    }

    return abortNavigation();

});