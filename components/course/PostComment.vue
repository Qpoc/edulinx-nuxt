<template>
    <div class="flex align-items-center col-12 mt-3">
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
    <div class="col-12 surface-100">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, repellendus repellat aliquid
        aliquam nobis nisi enim similique iure alias. Consectetur aut veritatis iure nemo ratione.
    </div>
    <div class="col-12 flex justify-content-between">
        <div>
            <Button label="Like" size="small" text plain />
            <Button class="ml-2" label="Comment" size="small" text plain />
        </div>
    </div>
</template>
<script setup lang="ts">
const authStore = useAuthUserStore();


const user: any = computed(() => {
    return authStore.user
});
</script>