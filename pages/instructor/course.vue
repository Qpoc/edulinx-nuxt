<template>
    <div class="h-full">
        <InstructorCreateCourse :visible="isAddCourse" @hide="isAddCourse = false" />
        <div v-if="courses.length <= 0" class="flex justify-content-center align-items-center h-full">
            <Card>
                <template #title>
                    <div class="flex justify-content-center">
                        <div class="text-3xl text-center">No Classes</div>
                    </div>
                </template>
                <template #content>
                    You haven't created any classes yet. To get started, create a new class.
                </template>
                <template #footer>
                    <div class="flex justify-content-end">
                        <Button @click="isAddCourse = true" icon="pi pi-plus" label="Create class" />
                    </div>
                </template>
            </Card>
        </div>

        <Card class="shadow-none" v-else>
            <template #content>
                <div class="grid grid-nogutter">
                    <div class="ml-3 col-3" v-for="(course, index) in courses" :key="index" >
                        <InstructorCourseCard :course="course"/>
                    </div>
                </div>
            </template>
        </Card>

    </div>
</template>
<script setup lang="ts">

const { $api } = useNuxtApp();

const isAddCourse = ref(false);
const courses = ref([]);

const paginateCourses = async () => {
    const { data } = <any>await $api.team.paginate();
    courses.value = data.value?.data
}

await paginateCourses();
</script>