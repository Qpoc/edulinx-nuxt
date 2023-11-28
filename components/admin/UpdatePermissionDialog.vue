<template>
    <Dialog v-model:visible="isViewCog" modal :style="{ width: '25rem' }" @hide="$emit('hide')">
        <template #header> Permission Configuration </template>
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
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

const props = defineProps({
    visible: Boolean,
    permission: Object,
});

const emit = defineEmits(['hide', 'update-permission']);

const { $api } = useNuxtApp();

const { handleSubmit } = useForm();

const toast = useToast();

const isViewCog = ref(false);
const isSubmitLoading = ref(false);

const { value: permission, errorMessage: permissionErrorMessage } = useField<string>('permission', useYup().string().required());

watch(
    () => props,
    async (value) => {
        if (value) {
            isViewCog.value = props.visible;
            permission.value = props.permission?.name;
        }
    },
    { deep: true }
);

const submit = handleSubmit(async (values) => {
    isSubmitLoading.value = true;
    const payload = {
        name: values.permission,
    };

    const { data } = await $api.permission.update(props.permission?.id, { body: payload });
    useShowToast(data, toast);
    isSubmitLoading.value = false;
    isViewCog.value = false;
    emit('update-permission');
});
</script>
