<template>
    <div class="grid">
        <div class="col-12">
            <CoursePostCard :course="course" />
        </div>
        <div class="col-12">
            <div class="grid">
                <div class="col-12">
                    <CoursePosts />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    course: Object
})
</script>