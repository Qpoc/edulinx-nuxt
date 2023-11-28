<template>
    <Dialog v-model:visible="isViewCog" modal :style="{ width: '25rem' }" @hide="$emit('hide')">
        <template #header> Role Configuration </template>
        <form @submit.prevent="submit" class="mt-3">
            <div class="formgrid grid">
                <div class="field col-12">
                    <InputText v-model="role" placeholder="Role" class="w-full"
                        :class="{ 'p-invalid': roleErrorMessage }" />
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col-12">
                    <MultiSelect v-model="permissions" :options="optionPermissions" display="chip" filter optionLabel="name"
                        placeholder="Select Permissions" class="w-full" />
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

const { $api } = useNuxtApp();

const props = defineProps({
    visible: Boolean,
    role: Object,
});

const emit = defineEmits(['hide', 'update-role']);

const { handleSubmit } = useForm();

const toast = useToast();

const isViewCog = ref(false);
const isSubmitLoading = ref(false);

const permissions = ref([]);
const optionPermissions: any = ref([]);
const { value: role, errorMessage: roleErrorMessage } = useField<string>('role', useYup().string().required());

const { data } = await $api.permission.list();
optionPermissions.value = data.value;

watch(
    () => props,
    async (value) => {
        if (value) {
            isViewCog.value = props.visible;
            role.value = props.role?.name;
            permissions.value = props.role?.permissions.map((permission: any) => {
                delete permission.pivot;
                return { ...permission };
            });
        }
    },
    { deep: true }
);

const submit = handleSubmit(async (values) => {
    isSubmitLoading.value = true;
    const payload = {
        name: values.role,
        permissions: permissions.value.map((permission:any) => permission.id),
    };

    const { data } = await $api.role.update(props.role?.id, { body: payload });
    useShowToast(data, toast);
    isSubmitLoading.value = false;
    isViewCog.value = false;
    emit('update-role');
});
</script>
