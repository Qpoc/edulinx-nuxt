<template>
    <Toast />
    <form @submit.prevent="login">
        <Card class="w-12 shadow-none">
            <template #title>
                <div class="text-center">Login</div>
            </template>
            <template #subtitle>
                <div class="text-center">Welcome to <span class="text-primary">Edulinx</span></div>
            </template>
            <template #content>
                <div class="field flex justify-content-center">
                    <InputText v-model="email" :class="{ 'p-invalid': emailErrorMessage }" placeholder="Email" />
                </div>
                <div class="field flex justify-content-center">
                    <InputText type="password" v-model="password" :class="{ 'p-invalid': passwordErrorMessage }"
                        placeholder="Password" />
                </div>
            </template>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button type="submit" size="small" icon="pi pi-sign-in" label="Login" :loading="isLoginBtnLoading" />
                    <Button @click="emit('sign-up')" size="small" icon="pi pi-user" severity="secondary" label="Sign up"
                        style="margin-left: 0.5em" />
                </div>
            </template>
        </Card>
    </form>
</template>
<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

const emit = defineEmits(['login', 'sign-up']);

const { $api } = useNuxtApp();

const { handleSubmit } = useForm();
const authUserStore = useAuthUserStore();

const { value: email, errorMessage: emailErrorMessage } = useField<string>('email', useYup().string().required().email());
const { value: password, errorMessage: passwordErrorMessage } = useField<string>('password', useYup().string().required());

const isLoginBtnLoading = ref(false);

const toast = useToast();

const login = handleSubmit(async (values) => {
    isLoginBtnLoading.value = true;

    const { data, error } = await $api.auth.login({ body: { email: values.email, password: values.password } });

    if (data.value) {
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + data.value.expires_in);
        const token = useCookie('token', { expires: expirationDate });
        token.value = data.value.access_token;
        authUserStore.addUser(data.value.user);
        const admins = ['super admin', 'admin'];
        emit('login');
        if (admins.includes(data.value.user.current_role.name.toLowerCase())) {
            navigateTo({ name: 'admin' });
        } else {
            navigateTo({ name: 'home' });
        }
    } else {
        let errorMessage = 'There was an issue. Please try again later.';
        errorMessage = error.value.statusCode >= 400 && error.value.statusCode < 422 ? error.value.data.error : errorMessage;
        if (error.value?.statusCode == 422) {
            errorMessage = '';
            for (const key in error.value?.data.errors) {
                error.value?.data.errors[key].forEach((error: any) => {
                    errorMessage += `${error} `;
                });
            }
        }
        toast.add({ severity: 'error', summary: 'Oops!', detail: errorMessage, life: 3000 });
    }

    isLoginBtnLoading.value = false;
});
</script>