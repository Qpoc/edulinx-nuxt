<template>
    <div>
        <Dialog v-model:visible="isAddPermission" modal :style="{ width: '25rem' }">
            <template #header> Create Permission </template>
            <form @submit.prevent="submit" class="mt-3">
                <div class="formgrid grid">
                    <div class="field col-12">
                        <InputText v-model="permission" placeholder="Permission" class="w-full"
                            :class="{ 'p-invalid': permissionErrorMessage }" />
                    </div>
                </div>
                <div class="flex justify-content-end">
                    <Button :loading="isSubmitLoading" type="submit" size="small" label="Submit" />
                </div>
            </form>
        </Dialog>
        <Button :loading="isSubmitLoading" @click="isAddPermission = true" icon="pi pi-plus" />
        <Toast />
    </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

const emit = defineEmits(['create-permission']);

const { $api } = useNuxtApp();

const { handleSubmit, handleReset } = useForm();
const toast = useToast();

const permissions = ref([]);
const { value: permission, errorMessage: permissionErrorMessage } = useField<string>('permission', useYup().string().required());

const isAddPermission = ref(false);
const isSubmitLoading = ref(false);



const submit = handleSubmit(async (values) => {
    isSubmitLoading.value = true;
    const payload = {
        name: values.permission,
        permissions: permissions.value.map((permission: any) => permission.id),
    };

    const { data } = await $api.permission.create({ body: payload });
    emit('create-permission');
    useShowToast(data, toast);

    isSubmitLoading.value = false;
    handleReset()
});
</script>
