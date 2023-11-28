<template>
    <div>
        <Dialog v-model:visible="isAddCourse" @hide="emit('hide')" modal style="width: 30vw"
            :breakpoints="{ '1199px': '80vw', '575px': '80vw' }">
            <template #header>
                Create Course
            </template>
            <form @submit.prevent="submit">
                <div class="formgrid grid">
                    <div class="field col-12">
                        <Chips v-model="invitations" placeholder="Invite Students via Email" :class="{ 'p-invalid': invitationsErrorMessage }">
                            <template #chip="slotProps">
                                <div>
                                    <span>{{ slotProps.value }} </span>
                                    <i class="pi pi-envelope ml-2" style="font-size: 14px"></i>
                                </div>
                            </template>
                        </Chips>
                    </div>
                    <div class="field col-12">
                        <InputText v-model="courseName" class="w-full" placeholder="Course Name"
                            :class="{ 'p-invalid': courseNameErrorMessage }" />
                    </div>
                </div>
                <div class="flex justify-content-center">
                    <Button :loading="isSubmit" type="submit" size="small" label="Create" />
                    <Button class="ml-2" size="small" severity="danger" @click="isAddCourse = false" label="Cancel" />
                </div>
            </form>
        </Dialog>
        <Toast />
    </div>
</template>
<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    visible: Boolean
});
const emit = defineEmits(['hide']);

const { $api } = useNuxtApp();

const toast = useToast();
const { handleSubmit, handleReset } = useForm();

const isSubmit = ref(false);

const { value: courseName, errorMessage: courseNameErrorMessage } = useField<string>('courseName', useYup().string().required());
const { value: invitations, errorMessage: invitationsErrorMessage } = useField('invitations', isEmail);

const isAddCourse = ref(false);

function isEmail(val: any) {
    if (val) {
        const email = val[val.length - 1]
        const schema = useYup().string().email()
        return schema.isValid(email);
    }
}

const submit = handleSubmit(async (values) => {
    isSubmit.value = true;
    const payload = {
        name: values.courseName,
        invitations: values.invitations ?? []
    }

    const { data } = await $api.team.create({ body: payload });
    isSubmit.value = false;
    useShowToast(data, toast);
    handleReset();
});

watch(() => props.visible, (value) => {
    isAddCourse.value = value;
});

</script>
<style scoped>
.p-chips.p-component.p-inputwrapper {
    width: 100%;
}

.p-chips.p-component.p-inputwrapper:deep(ul) {
    width: 100% !important;
}
</style>