<template>
    <div>
        <Card
            class="w-12 shadow-2 overflow-hidden cursor-pointer hover:surface-50"
            style="min-height: 400px; max-height: 400px;">
            <template #header>
                <div class="course-header">
                    <img v-if="course?.cover_photo_url" :src="course?.cover_photo_url">
                    <img v-else src="~/assets/background/tutor.jpg">
                </div>
            </template>
            <template #title>
                <div>{{ course?.name }}</div>
            </template>
            <template #subtitle>
                <div class="course-subtitle" v-html="course?.description"></div>
            </template>
            <template #content>
                <AvatarGroup>
                    <Avatar v-for="(user, index) in course?.users" :key="index" :image="user.avatar" shape="circle" />
                    <Avatar v-if="course?.users.length > 7" :label="`+ ${course?.users.length - 7}`" shape="circle" />
                </AvatarGroup>
            </template>
        </Card>
    </div>
</template>
<script setup lang="ts">
defineProps({
    course: Object
});

</script>
<style scoped>
img {
    max-height: 200px;
    width: 100%;
    transition: 0.2s;
}

.course-header {
    max-width: 100%;
    max-height: 200px;
    overflow: hidden;
}

.course-header:hover>img {
    filter: blur(0);
    transform: scale(2);
    transition: 0.2s;
}

.course-subtitle {
    display: -webkit-box;
    -moz-box-orient: vertical;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    height: 100%;
    overflow: hidden;
}
</style>