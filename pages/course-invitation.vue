<template>
    <div class="flex justify-content-center align-items-center h-screen">
        <Toast />
        <Card v-if="statusCode == 404" class="w-15rem shadow-none sm:w-20rem lg:w-30rem">
            <template #title>
                <div class="text-center">Invalid Token</div>
            </template>
            <template #subtitle>
                <div class="text-center">Oops! Looks like there's an issue.</div>
            </template>
            <template #content>
                <div class="text-center">
                    <p>We're sorry, but the invitation link you've used seems to be invalid or has expired.
                        Please ensure you're using the correct link or contact the administrator for assistance.</p>
                </div>
            </template>
        </Card>
        <Card v-else-if="fetchUser" class="w-15rem shadow-none sm:w-20rem lg:w-30rem">
            <template #title>
                <div class="text-center">Invitation Accepted!</div>
            </template>
            <template #subtitle>
                <div class="text-center">Welcome</div>
            </template>
            <template #content>
                <div class="text-center">
                    <p> Congratulations! You've successfully accepted the invitation and joined our classroom.
                        Get ready to dive into an exciting learning experience with your fellow
                        classmates.</p>
                    <p>
                        Feel free to explore the course materials and engage in discussions. We're thrilled to have you on
                        board!
                    </p>
                    <p>
                        You will be redirected to your dashboard shortly.
                    </p>
                </div>
            </template>
        </Card>
        <Card v-else-if="!fetchUser" class="w-15rem shadow-none sm:w-20rem lg:w-30rem">
            <template #title>
                <div class="text-center">Please Log In</div>
            </template>
            <template #subtitle>
                <div class="text-center">Log in to Accept the Invitation</div>
            </template>
            <template #content>
                <div class="text-center">
                    <p> To accept the invitation and join the classroom, please log in to your account.
                        Once you are logged in, you will automatically accept the invitation.</p>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button @click="isShowLogin = true" label="Log In" />
                </div>
            </template>
        </Card>
        <Dialog v-model:visible="isShowLogin" modal>
            <template #header>
                <p></p>
            </template>
            <LoginForm @login="isLoggedIn" />
        </Dialog>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'guest'
});

const { $api } = useNuxtApp();

const user: any = useAuthUserStore();
const fetchUser = await user.getUser;

const isShowLogin = ref(false);

const route: any = useRoute();

const statusCode: any = ref(null);

const validateToken = async () => {
    return await $api.team.validateToken(route.query.token);
}

const acceptInvitation = async () => {
    return await $api.team.acceptInvite(route.query.token);
}

if (!fetchUser) {
    const { error } = await validateToken();

    if (error.value) {
        statusCode.value = error.value.statusCode;
    }

} else {
    const { data, error } = await acceptInvitation();

    if (error.value) {
        statusCode.value = error.value.statusCode;
    }

    if (data.value && fetchUser) {
        setTimeout(() => {
            navigateTo({ name: 'index' });
        }, 1500);
    }
}

const isLoggedIn = async () => {
    await acceptInvitation();
}

</script>