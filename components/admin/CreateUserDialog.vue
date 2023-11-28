<template>
	<div>
		<Dialog v-model:visible="isAddUser" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
			<template #header> Create User </template>
			<form @submit.prevent="submit" class="mt-3">
				<div class="formgrid grid">
					<div class="field col-12 md:col-6">
						<InputText v-model="firstName" placeholder="First Name" class="w-full" :class="{ 'p-invalid': firstNameErrorMessage }" />
					</div>
					<div class="field col-12 md:col-6">
						<InputText v-model="middleName" placeholder="Middle Name" class="w-full" />
					</div>
					<div class="field col-12 md:col-6">
						<InputText v-model="lastName" placeholder="Last Name" class="w-full" :class="{ 'p-invalid': lastNameErrorMessage }" />
					</div>
					<div class="field col-12 md:col-6">
						<InputText v-model="email" placeholder="Email" class="w-full" :class="{ 'p-invalid': emailErrorMessage }" />
					</div>
					<div class="field col-12 md:col-6">
						<InputText v-model="password" type="password" placeholder="Password" class="w-full" :class="{ 'p-invalid': passwordErrorMessage }" />
					</div>
					<div class="field col-12 md:col-6">
						<InputText v-model="passwordConfirm" type="password" placeholder="Confirm Password" class="w-full" :class="{ 'p-invalid': passwordConfirmErrorMessage }" />
					</div>
					<div class="field col-12">
                        <MultiSelect v-model="roles" :options="roleOptions" display="chip" filter optionLabel="name" placeholder="Select Roles" class="w-full" :class="{ 'p-invalid': roleErrorMessage }"/>
					</div>
				</div>
				<div class="flex justify-content-end">
					<Button :loading="isSubmitLoading" type="submit" size="small" label="Submit" />
				</div>
			</form>
		</Dialog>
		<Button @click="isAddUser = true" icon="pi pi-user-plus" />
		<Toast />
	</div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

const { $api } = useNuxtApp();

const { handleSubmit, handleReset } = useForm();

const toast = useToast();

const { value: firstName, errorMessage: firstNameErrorMessage } = useField<string>('firstName', useYup().string().required());
const { value: middleName } = useField<string>('middleName');
const { value: lastName, errorMessage: lastNameErrorMessage } = useField<string>('lastName', useYup().string().required());
const { value: email, errorMessage: emailErrorMessage } = useField<string>('email', useYup().string().email().required());
const { value: password, errorMessage: passwordErrorMessage } = useField<string>('password', useYup().string().min(8).required());
const { value: passwordConfirm, errorMessage: passwordConfirmErrorMessage } = useField<string>('passwordConfirm', isPasswordMatch);
const { value: roles, errorMessage: roleErrorMessage } = useField<object>('roles', useYup().array().required());

const isAddUser = ref(false);
const roleOptions = ref<any>([]);
const isSubmitLoading = ref(false);

const emit = defineEmits(['create-user']);

watch(isAddUser, async () => {
	if (isAddUser) {
		const { data } = await $api.role.list();
		roleOptions.value = data.value;
	}
});


function isPasswordMatch(value: any) {
	return password.value == value;
}

const submit = handleSubmit(async (values) => {
	isSubmitLoading.value = true;
	const payload = {
		first_name: values.firstName,
		middle_name: values.middleName,
		last_name: values.lastName,
		email: values.email,
		password: values.password,
		password_confirmation: values.passwordConfirm,
		roles: values.roles.map((role:any) => role.id),
	};

	const { data } = await $api.user.create({ body: payload }); 
	emit('create-user');
	useShowToast(data, toast);
	isSubmitLoading.value = false;
    handleReset();
});
</script>
