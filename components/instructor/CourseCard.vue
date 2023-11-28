<template>
    <div>
        <Card class="w-12 shadow-2 overflow-hidden">
            <template #header>
                <div class="course-header">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="">
                </div>
            </template>
            <template #title>
                <div class="text-center">{{ course.name }}</div>
            </template>
            <template #subtitle>
                <div class="text-center">Course Description</div>
            </template>
            <template #footer>
                <div class="flex justify-content-end">
                    <Button size="small" label="View" />
                </div>
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
    filter: blur(3px);
    transition: 0.2s;
}
.course-header {
    max-height: 100%;
    overflow: hidden;
}
.course-header:hover > img {
    filter: blur(0);
    transform: scale(2);
    transition: 0.2s;
}
</style>