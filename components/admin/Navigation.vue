<template>
    <div class="flex flex-column h-ful overflow-y-auto" style="height: 89vh;">
        <div>
            <ul class="list-none p-3 m-0">
                <li>
                    <ul class="list-none p-0 m-0 overflow-hidden relative">
                        <li :class="{ 'edx-active': route.name == 'admin' }">
                            <a @click="navigate($event, 'admin')" v-ripple
                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                <i class="pi pi-home mr-2"></i>
                                <span :class="{ 'text-primary': route.name == 'admin' }"
                                    class="font-medium text-secondary">Home</span>
                            </a>
                        </li>
                        <li :class="{ 'edx-active': route.name == 'admin-user' }">
                            <a @click="navigate($event, 'admin-user')" v-ripple
                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                <i class="pi pi-user mr-2"></i>
                                <span :class="{ 'text-primary': route.name == 'admin-user' }"
                                    class="font-medium">Users</span>
                            </a>
                        </li>
                        <li>
                            <a :class="{ 'edx-active': route.name == 'admin-role' || route.name == 'admin-permission' }"
                                v-ripple v-styleclass="{
                                    selector: '@next',
                                    enterClass: 'hidden',
                                    enterActiveClass: 'slidedown',
                                    leaveToClass: 'hidden',
                                    leaveActiveClass: 'slideup'
                                }"
                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                <i class="pi pi-lock mr-2"></i>
                                <span
                                    :class="{ 'text-primary': route.name == 'admin-role' || route.name == 'admin-permission' }"
                                    class="font-medium">Roles & Permissions</span>
                                <i class="pi pi-chevron-down ml-auto"></i>
                            </a>
                            <ul
                                class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                <li @click="navigate($event, 'admin-role')"
                                    :class="{ 'edx-active': route.name == 'admin-role' }">
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-users mr-2"></i>
                                        <span :class="{ 'text-primary': route.name == 'admin-role' }"
                                            class="font-medium">Roles</span>
                                    </a>
                                </li>
                                <li @click="navigate($event, 'admin-permission')"
                                    :class="{ 'edx-active': route.name == 'admin-permission' }">
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-key mr-2"></i>
                                        <span :class="{ 'text-primary': route.name == 'admin-permission' }"
                                            class="font-medium">Permissions</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <div :style="{ top: top + 'px', left: left + 'px', height: height + 'px' }" id="marker">
                        </div>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="mt-auto">
            <hr class="mx-3 border-top-1 border-none surface-border" />
            <a v-ripple
                class="m-3 mb-0 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                <Avatar :image="authStore.getUser?.avatar" shape="circle" />
                <span class="font-bold">{{ fullName }}</span>
            </a>
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute();
const offsetTop = useCookie('offsetTop');
const offsetLeft = useCookie('offsetLeft');
const offsetHeight = useCookie('offsetHeight');

const top = ref(offsetTop.value ?? 5);
const left = ref(offsetLeft.value ?? 0);
const height = ref(offsetHeight.value ?? 0);

const authStore = useAuthUserStore();

const fullName = computed(() => {
    return authStore.getUser?.first_name + ' ' + authStore.getUser?.last_name;
})

const navigate = (event: any, name: string) => {
    top.value = offsetTop.value = event.currentTarget.offsetTop;
    left.value = offsetLeft.value = event.currentTarget.offsetLeft;
    height.value = offsetHeight.value = event.currentTarget.offsetHeight;

    navigateTo({ name: name, query: { page: 1 } })
}
</script>
<style scoped>
#marker {
    position: absolute;
    border-left: 3px solid #8183F4;
    transition: 0.3s;
    pointer-events: none;
    height: 52px;
}
</style>