<template>
    <div class="flex flex-column h-ful overflow-y-auto sticky" style="height: 89vh; top: 70px;">
        <div>
            <ul class="list-none p-3 m-0">
                <li>
                    <ul class="list-none p-0 m-0 overflow-hidden relative">
                        <li :class="{ 'edx-active': route.name == navigation.to }"
                            v-for="(navigation, index) in navigations" :key="index">
                            <a @click="navigate($event, navigation.to)" v-ripple
                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                <i class="mr-2" :class="navigation.icon"></i>
                                <span :class="{ 'text-primary': route.name == navigation.to }"
                                    class="font-medium text-secondary">{{ navigation.label }}</span>
                            </a>
                        </li>
                        <div :style="{ top: top + 'px', left: left + 'px', height: height + 'px' }" id="marker">
                        </div>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="mt-auto">
            <hr class="mx-3 border-top-1 border-none surface-border" />
            <div v-ripple
                class="m-3 mb-0 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                <Avatar :image="authStore.getUser?.avatar" shape="circle" />
                <div class="flex flex-column">
                    <span class="font-bold">{{ fullName }}</span>
                    <span class="text-primary font-semibold">
                        {{ authStore?.getUser?.current_role.name }}
                    </span>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute();
const offsetTop = useCookie('offsetTop');
const offsetLeft = useCookie('offsetLeft');
const offsetHeight = useCookie('offsetHeight');

const authStore: any = useAuthUserStore();

const top = ref(offsetTop.value ?? 5);
const left = ref(offsetLeft.value ?? 0);
const height = ref(offsetHeight.value ?? 0);
const navigations: any = ref([]);

const fullName = computed(() => {
    return authStore.getUser?.first_name + ' ' + authStore.getUser?.last_name;
})

const navigate = (event: any, name: string, options: object = {}) => {
    top.value = offsetTop.value = event.currentTarget.offsetTop;
    left.value = offsetLeft.value = event.currentTarget.offsetLeft;
    height.value = offsetHeight.value = event.currentTarget.offsetHeight;

    navigateTo({ name: name, ...options })
}

const evaluateNavigation = () => {
    const admins = ['super admin', 'admin'];
    if (authStore.getUser?.current_role.name.toLowerCase() == 'instructor' || admins.includes(authStore.getUser?.current_role.name.toLowerCase())) {
        navigations.value = [
            {
                name: 'home',
                label: 'Home',
                icon: 'pi pi-home',
                to: 'home'
            },
            {
                name: 'course',
                label: 'Courses',
                icon: 'pi pi-pencil',
                to: 'instructor-course'
            },
            {
                name: 'assignment',
                label: 'Assignments',
                icon: 'pi pi-file',
                to: 'assignment'
            },
            {
                name: 'calendar',
                label: 'Calendar',
                icon: 'pi pi-calendar',
                to: 'calendar'
            },
            {
                name: 'resource',
                label: 'Resources',
                icon: 'pi pi-book',
                to: 'resource'
            },
        ]
    } else if (authStore.getUser?.current_role.name.toLowerCase() == 'student') {
        navigations.value = [
            {
                name: 'home',
                label: 'Home',
                icon: 'pi pi-home',
                to: 'home'
            },
            {
                name: 'courses',
                label: 'Courses',
                icon: 'pi pi-pencil',
                to: 'course'
            },
            {
                name: 'assignment',
                label: 'Assignments',
                icon: 'pi pi-file',
                to: 'assignment'
            },
            {
                name: 'calendar',
                label: 'Calendar',
                icon: 'pi pi-calendar',
                to: 'calendar'
            },
            {
                name: 'resource',
                label: 'Resources',
                icon: 'pi pi-book',
                to: 'resource'
            },
        ]
    }
}

evaluateNavigation();
</script>
<style scoped>
#marker {
    position: absolute;
    border-left: 3px solid #8183F4;
    transition: 0.3s;
    pointer-events: none;
    height: 52px;
}

.p-divider-solid.p-divider-horizontal:before {
    border-top-style: solid !important;
}


.p-divider.p-divider-horizontal:before {
    border-top: 1px #000000;
}
</style>