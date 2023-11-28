<template>
    <div class="card flex justify-content-center">
        <Sidebar v-model:visible="visible">
            <template #container="{ closeCallback }">
                <div class="flex align-items-center justify-content-end px-4 pt-3 flex-shrink-0">
                    <span>
                        <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined
                            class="h-2rem w-2rem"></Button>
                    </span>
                </div>
                <AdminNavigation />
            </template>
        </Sidebar>
        <Button class="xl:hidden" size="small" icon="pi pi-bars" @click="visible = true" />
    </div>
</template>
<script setup lang="ts">
const visible = ref(false);


</script>
