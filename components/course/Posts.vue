<template>
    <Card>
        <template #header>
            <div class="flex justify-content-end pr-1">
                <Button icon="pi pi-ellipsis-h" size="small" rounded text plain />
            </div>
        </template>
        <template #title>
            <div class="flex justify-content-between">
                <div class="flex align-items-center">
                    <div>
                        <Avatar :image="user?.avatar" shape="circle" />
                    </div>
                    <div class="ml-2">
                        <div class="text-primary text-sm">
                            John Cyrus Patungan
                        </div>
                        <div class="text-sm text-gray-500 font-normal">
                            {{ $dayjs('2023-11-29').fromNow() }}
                        </div>
                    </div>
                </div>
                <div>
                    <Button size="small" text label="Add Friend" />
                </div>
            </div>
        </template>
        <template #content>
            <div class="flex flex-column">
                <!-- <div>
                    <Image src="http://localhost:3000/_nuxt/assets/images/quiz.jpg" alt="Image" width="250" />
                    
                </div> -->
                <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim in quae quas eos veniam officia debitis
                    excepturi
                    omnis dicta odit magni recusandae, qui saepe vero officiis beatae ipsa et tempore.
                </div>
            </div>
        </template>
        <template #footer>
            <div class="grid">
                <div class="col-12 flex justify-content-between">
                    <div>
                        <Button label="Like" icon="pi pi-thumbs-up" size="small" text plain />
                        <Button class="ml-2" label="Comment" icon="pi pi-comment" size="small" text plain />
                    </div>
                    <div>
                        <Button label="Share" icon="pi pi-share-alt" size="small" text plain />
                    </div>
                </div>
                <div class="col-12 flex align-items-start relative">
                    <div class="mr-2">
                        <Avatar :image="user?.avatar" shape="circle" />
                    </div>
                    <Editable placeholder="Write a comment..." class="w-full" min-height="46" />
                    <Button class="absolute" style="bottom: 0px; right: 10px;" icon="pi pi-send" size="small" text
                        rounded />
                </div>
                <!-- <CoursePostComment /> -->
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
const authStore = useAuthUserStore();


const user: any = computed(() => {
    return authStore.user
});

</script>