<template>
	<div>
		<Dialog v-model:visible="isAddRole" modal :style="{ width: '25rem' }">
			<template #header> Create Roles </template>
			<form @submit.prevent="submit" class="mt-3">
				<div class="formgrid grid">
					<div class="field col-12">
						<InputText v-model="role" placeholder="Role" class="w-full" :class="{ 'p-invalid': roleErrorMessage }" />
					</div>
				</div>
				<div class="formgrid grid">
					<div class="field col-12">
						<MultiSelect v-model="permissions" :options="optionPermissions" display="chip" filter optionLabel="name" placeholder="Select Permissions" class="w-full" />
					</div>
				</div>
				<div class="flex justify-content-end">
					<Button :loading="isSubmitLoading" type="submit" size="small" label="Submit" />
				</div>
			</form>
		</Dialog>
		<Button :loading="isSubmitLoading" @click="isAddRole = true" icon="pi pi-plus" />
		<Toast />
	</div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

const { $api } = useNuxtApp();

const emit = defineEmits(['create-role']);

const { handleSubmit, handleReset } = useForm();
const toast = useToast();


const { value: permissions } = useField<any>('permissions');
const { value: role, errorMessage: roleErrorMessage } = useField<string>('role', useYup().string().required());
const optionPermissions: any = ref([]);
const isAddRole = ref(false);
const isSubmitLoading = ref(false);

const { data } = await $api.permission.list();
optionPermissions.value = data.value;

const submit = handleSubmit(async (values) => {
	isSubmitLoading.value = true;
	const payload = {
		name: values.role,
		permissions: values.permissions.map((permission: any) => permission.id),
	};

	const { data, error } = await $api.role.create({ body: payload });

	emit('create-role');
	useShowToast(data, toast);

	isSubmitLoading.value = false;
	if (!error.value) {
        handleReset()
    }
});
</script>
