<template>
    <div class="card flex align-items-center justify-content-between p-1">
        <Dialog v-model:visible="isLogin" modal>
            <template #header>
                <p></p>
            </template>
            <LoginForm @login="isLogin = false" @sign-up="isSignUp = true; isLogin = false" />
        </Dialog>
        <Dialog v-model:visible="isSignUp" modal>
            <template #header>
                <p></p>
            </template>
            <SignupForm @login="isLogin = true; isSignUp = false" />
        </Dialog>
        <div class="flex align-items-center">
            <Image alt="Edulinx">
                <template #image>
                    <img src="~/assets/logo/logo-abbreviate.png" contain style="max-width: 100px;"/>
                </template>
            </Image>
            <a v-ripple class="text-primary font-bold text-3xl hidden lg:flex">Edulinx</a>
        </div>

        <div class="flex flex-auto align-items-center">
            <InputText size="small" placeholder="Search" type="text" class="mx-1 lg:mx-8 w-full" />
        </div>

        <div v-if="authStore.getUser" class="flex align-items-center gap-2">
            <AdminSideBar />
            <Avatar size="large" @click="toggle" style="cursor: pointer" aria-haspopup="true" aria-controls="overlay_menu"
                :image="authStore.getUser?.avatar" shape="circle" />
            <TieredMenu ref="menu" id="overlay_menu" :model="menuItems" :popup="true">
                <template #start>
                    <div class="flex justify-content-center font-bold">
                        {{ authStore.getUser.current_role.name }}
                    </div>
                    <hr class="mx-3">
                </template>
                <template #item="{ item, props, hasSubmenu }">
                    <a v-ripple class="flex align-items-center" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                        <span v-if="item.shortcut"
                            class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut
                            }}</span>
                        <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto text-primary"></i>
                    </a>
                </template>
            </TieredMenu>
        </div>
        <div v-else class="flex">
            <Button @click="isLogin = true" icon="pi pi-sign-in" size="small"
                :label="$viewport.breakpoint.value == 'desktopWide' ? 'Login' : ''" />
            <Button @click="isSignUp = true" icon="pi pi-book" severity="secondary" class="ml-2" size="small"
                :label="$viewport.breakpoint.value == 'desktopWide' ? 'Sign up' : ''" />
        </div>
    </div>
</template>

<script setup lang="ts">

const { $api, $viewport } = useNuxtApp();

const offsetLeft = useCookie('offsetLeft');
const offsetTop = useCookie('offsetTop');
const offsetHeight = useCookie('offsetHeight');
const token = useCookie('token');
const authStore = useAuthUserStore();
const isLogin = ref(false);
const isSignUp = ref(false);

const menu = ref();

const menuItems = ref([
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            return logout();
        }
    },
]);

const toggle = (event: any) => {
    menu.value.toggle(event);
};

const switchRole = async (role: any) => {
    await $api.role.switchRole(role.id)
    reloadNuxtApp({
        path: '/',
        force: true
    })
};

const logout = async () => {
    const { data } = await $api.auth.logout();
    if (data.value) {
        offsetLeft.value = null;
        offsetTop.value = null;
        offsetHeight.value = null;
        token.value = null;
        reloadNuxtApp({
            path: '/',
            force: true
        });
    }
};

if (authStore.getUser) {
    menuItems.value.unshift({
        label: 'Switch to',
        icon: 'pi pi-users',
        items: authStore.getUser.roles.map((role: any) => {
            return {
                ...role, label: role.name, command: () => {
                    return switchRole(role)
                }
            }
        }),

    },)
}
</script>
