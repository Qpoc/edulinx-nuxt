<template>
    <div>
        <Toast />
        <form @submit.prevent="register">
            <Card class="w-12 shadow-none">
                <template #title>
                    <div class="text-center">Create an account</div>
                </template>
                <template #subtitle>
                    <div class="text-center">Welcome to <span class="text-primary">Edulinx</span></div>
                </template>
                <template #content>
                    <div class="field flex justify-content-center">
                        <InputText v-model="firstName" :class="{ 'p-invalid': firstNameErrorMessage }"
                            aria-describedby="text-error" placeholder="First Name" />
                    </div>
                    <div class="field flex justify-content-center">
                        <InputText v-model="middleName" placeholder="Middle Name" />
                    </div>
                    <div class="field flex justify-content-center">
                        <InputText v-model="lastName" :class="{ 'p-invalid': lastNameErrorMessage }"
                            placeholder="Last Name" />
                    </div>
                    <div class="field flex justify-content-center">
                        <InputText v-model="email" :class="{ 'p-invalid': emailErrorMessage }" placeholder="Email" />
                    </div>
                    <div class="field flex justify-content-center">
                        <Password v-model="password" :class="{ 'p-invalid': passwordErrorMessage }"
                            placeholder="Password" />
                    </div>
                    <div class="field flex justify-content-center">
                        <Password v-model="confirmPassword" :class="{ 'p-invalid': confirmPasswordErrorMessage }"
                            placeholder="Confirm Password" />
                    </div>
                </template>
                <template #footer>
                    <div class="flex flex-column lg:flex-row justify-content-center">
                        <Button type="submit" size="small" icon="pi pi-user-plus" severity="primary" label="Create account"
                            style="margin-left: 0.5em" :loading="isSubmitBtnLoading" />
                        <Button @click="emit('login')" size="small" icon="pi pi-user" severity="secondary" label="Sign in" class="mt-2 lg:m-0 lg:ml-1"
                            style="margin-left: 0.5em" />
                    </div>
                </template>
            </Card>
        </form>
    </div>
</template>
<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

const emit = defineEmits(['login']);

const { $api } = useNuxtApp();

const { handleSubmit, resetForm } = useForm();
const { value: firstName, errorMessage: firstNameErrorMessage } = useField<string>('firstName', useYup().string().required());
const { value: middleName, errorMessage: middleNameErrorMessage } = useField<string>('middleName');
const { value: lastName, errorMessage: lastNameErrorMessage } = useField<string>('lastName', useYup().string().required());
const { value: email, errorMessage: emailErrorMessage } = useField<string>('email', useYup().string().required().email());
const { value: password, errorMessage: passwordErrorMessage } = useField<string>('password', useYup().string().required().min(8));
const { value: confirmPassword, errorMessage: confirmPasswordErrorMessage } = useField<string>('passwordConfirmation', isPasswordMatch);

const isSubmitBtnLoading = ref(false);

const toast = useToast();

function isPasswordMatch(value: any) {
    return password.value == value;
}

const register = handleSubmit(async (values) => {
    isSubmitBtnLoading.value = true;

    const payload = {
        first_name: values.firstName,
        middle_name: values.middleName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
    };

    const { data } = await $api.auth.register({ body: payload });

    useShowToast(data, toast);

    isSubmitBtnLoading.value = false
});
</script>