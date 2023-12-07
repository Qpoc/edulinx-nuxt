<template>
    <div class="h-full">
        <InstructorCreateCourse :visible="isAddCourse" @hide="isAddCourse = false" @course-created="courseCreated" />
        <div class="flex justify-content-end">
            <Button :label="'Add Course'" @click="isAddCourse = true" size="small" />
        </div>
        <div v-if="courses?.length <= 0" class="flex justify-content-center align-items-center h-full">
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
                <div class="grid grid-nogutter justify-content-center">
                    <div class="ml-3 col-12 md:col-5 lg:col-3 course-card" v-for="(course, index) in courses" :key="index">
                        <InstructorCourseCard @click="navigateTo({ name: 'course-feed', query: { id: course?.id, name: course?.name.toLowerCase() } })" :course="course" class="mt-3" />
                    </div>
                </div>
            </template>
        </Card>
        <div v-if="loading" class="flex justify-content-center mb-5">
            <i class="pi pi-spin pi-spinner text-primary" style="font-size: 2rem"></i>
        </div>
    </div>
</template>
<script setup lang="ts">

const { $api } = useNuxtApp();

const isAddCourse = ref(false);
const courses = ref([]);
const loading = ref(false);
const paginate = ref(1);

const paginateCourses = async (page = 1) => {
    loading.value = true;
    const { data } = await $api.team.paginate(page);
    courses.value.push(...data.value?.data)
    loading.value = false;
    return data;
}

const courseCreated = () => {
    isAddCourse.value = false;
    paginateCourses();
}

const scrollListener = async (event: any) => {
    const bottom = document.documentElement.clientHeight + document.documentElement.scrollTop
    if (document.documentElement.scrollHeight <= bottom) {
        paginate.value += 1;
        console.log("🚀 ~ file: course.vue:64 ~ scrollListener ~ paginate:", paginate)
        const data = await paginateCourses(paginate.value);
        if (!data.value.data.length) {
            paginate.value -= 1
        } 
    }

}

await paginateCourses();

onMounted(() => {
    window.onscroll = scrollListener
})
</script>
<style scoped>
.course-card {
    animation: scaleUp 0.2s;
}

@keyframes scaleUp {
    0% {
        transform: scale(0);
    }
    25% {
        transform: scale(0.25);
    }
    50% {
        transform: scale(0.5);
    }
    75% {
        transform: scale(0.75);
    }
    100% {
        transform: scale(1);
    }
    
}
</style>