<template>
    <div class="relative">
        <SpeedDial :model="items" direction="up" class="fixed" buttonClass="p-button-secondary"
            style="z-index: 1; bottom: 10px; right: 10px;" />
        <NuxtLoadingIndicator color="primary" />
        <Header class="sticky top-0 bg-white shadow-3" style="z-index: 2;" />
        <div class="grid grid-nogutter">
            <div class="hidden xl:col-2 xl:block">
                <Navigation />
            </div>
            <div class="col-12 xl:col-8 pt-5" style="padding: 100px;">
                <NuxtPage />
            </div>
            <div class="col-12 xl:col-2 pt-5 px-3">
                <div class="grid">
                    <div class="col-12">
                        <Card>
                            <template #title>
                                Students
                            </template>
                            <template #content>
                                No students yet.
                            </template>
                        </Card>
                    </div>
                    <div class="col-12">
                        <Card>
                            <template #title>
                                Quizzes
                            </template>
                            <template #content>
                                No upcoming quizzes
                            </template>
                        </Card>
                    </div>
                    <div class="col-12">
                        <Card>
                            <template #title>
                                Top students
                            </template>
                            <template #content>
                                No students yet.
                            </template>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
        <Footer class="mt-5" />
    </div>
</template>
<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

useHead({
    title: 'Edulinx'
});

const toast = useToast();
const items = ref([
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
    },
    {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
            router.push('/fileupload');
        }
    },
    {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://vuejs.org/'
        }
    }
])
</script>
<style>
html,
body {
    padding: 0;
    margin: 0;
}
</style>