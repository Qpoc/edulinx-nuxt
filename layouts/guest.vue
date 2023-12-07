<template>
    <div class="relative min-h-screen">
        <NuxtLoadingIndicator color="#" />
        <Header v-if="!invitationRoutes.includes(route.name)" class="sticky top-0 bg-white shadow-3" style="z-index: 2;" />
        <NuxtPage />
        <Footer class="absolute bottom-0 w-full" />
    </div>
</template>
<script setup lang="ts">
useHead({
    title: 'Edulinx'
});
const route: any = useRoute();
const invitationRoutes = ref([
    'course-invitation'
]);
</script>
<style>
html,
body {
    padding: 0;
    margin: 0;
}
</style>