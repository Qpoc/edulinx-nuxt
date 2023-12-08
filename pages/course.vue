<template>
    <div class="flex flex-column">
        <div class="font-bold text-3xl lg:text-justify text-primary">
            {{ course?.name }}
        </div>
        <div class="course-header">
            <img v-if="course?.cover_photo_url" :src="course?.cover_photo_url">
            <img v-else src="~/assets/background/tutor.jpg">
        </div>
        <div class="sticky bg-white" style=" position:sticky;top:69px; z-index: 999">
            <div class="flex justify-content-between align-items-center">
                <div>
                    <TabMenu v-model:activeIndex="activeTab" :model="tabs" class="w-full" />
                </div>
                <div class="pr-3">
                    <i class="pi pi-cog text-3xl text-primary" />
                </div>
            </div>
        </div>
        <div>
            <NuxtPage :course="course" />
        </div>
    </div>
</template>
<script setup lang="ts">

definePageMeta({
    layout: 'course'
});

const route: any = useRoute();

const { $api } = useNuxtApp();

const course: any = ref({});
const activeTab = ref(0);
const tabs = ref([
    {
        label: 'Feed',
        routeName: 'course-feed'
    },
    {
        label: 'About',
        routeName: 'course-about'
    },
    {
        label: 'Student',
        routeName: 'course-student'
    }
]);

const { data } = await $api.team.get(route.query?.id);
course.value = data.value;

watch(activeTab, async (val) => {
    const tab = tabs.value.find((tab: any, index: number) => index == val)
    activeTab.value = val;
    window.scroll({top: 0, behavior: "smooth"})
    navigateTo({ name: tab?.routeName, query: { id: route.query?.id, name: route.query?.name } })
});


</script>
<style scoped>
.course-header {
    width: 100%;
    height: 300px;
}

.course-header img {
    width: 100%;
    max-height: 100%;
}

.sticky-container {
    position: sticky;
    top: 0;
}
</style>