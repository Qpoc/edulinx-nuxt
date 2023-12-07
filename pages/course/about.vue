<template>
    <div>
        <CourseAboutCard :course="course"/>
    </div>
</template>
<script setup lang="ts">
defineProps({
    course: Object
})
</script>
