<template>
    <Card>
        <template #content>
            <div class="grid mt-3">
                <div class="col-12 font-bold text-center lg:text-justify text-primary">
                    Description
                </div>
                <div class="col-12">
                    {{ course?.description }}
                </div>
                <div class="col-12 font-bold text-center lg:text-justify text-primary">
                    About
                </div>
                <div class="col-12" v-html="course?.about">
                </div>
            </div>
        </template>
        <template #footer>
            <div class="font-bold text-primary">
                Instructor: {{ course.owner.full_name }}
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
defineProps({
    course: Object
})
</script>