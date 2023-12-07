<template>
    <div>
        <Toast />
        <Dialog v-model:visible="isAddCourse" @hide="emit('hide')" modal style="width: 40vw"
            :breakpoints="{ '1199px': '80vw', '575px': '80vw' }">
            <template #header>
                Create Course
            </template>
            <form @submit.prevent="submit">
                <div class="formgrid grid">
                    <div class="field col-12">
                        <Chips v-model="invitations" placeholder="Invite Students via Email"
                            :class="{ 'p-invalid': invitationsErrorMessage }">
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
                    <div class="field col-12">
                        <Textarea v-model="description" class="w-full" autoResize rows="5" cols="30"
                            placeholder="Enter a short description, this will be displayed on the course card"
                            :class="{ 'p-invalid': descriptionErrorMessage }" />
                        <div class="flex justify-content-end">
                            <sub>{{ description?.length ?? 0 }}/256</sub>
                        </div>
                    </div>
                    <div class="field col-12">
                        <Editor v-model="about" editorStyle="height: 320px"
                            placeholder="Enter a brief overview of the course, including its objectives, key topics, and what students can expect to learn. Use this space to provide a compelling introduction that captures the essence of the course.">
                            <template v-slot:toolbar>
                                <span class="ql-formats">
                                    <select class="ql-size">
                                        <option value="small"></option>
                                        <option selected></option>
                                        <option value="large"></option>
                                        <option value="huge"></option>
                                    </select>
                                    <select class="ql-header">
                                        <option value="1"></option>
                                        <option value="2"></option>
                                        <option value="3"></option>
                                        <option value="4"></option>
                                        <option value="5"></option>
                                        <option value="6"></option>
                                    </select>
                                    <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                                    <button v-tooltip.bottom="'blockquote'" class="ql-code-block"></button>
                                    <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                                    <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
                                    <button class="ql-script" value="sub"></button>
                                    <button class="ql-script" value="super"></button>
                                </span>
                            </template>
                        </Editor>
                    </div>
                    <div class="field col-12">
                        <FileUpload v-model="background" mode="basic" :disabled="false" accept="image/*"
                            :maxFileSize="1000000" :multiple="false" :file-limit="1" @select="onSelect($event)" class="w-full" choose-label="Upload your course cover photo"
                            @remove="background = null">
                        </FileUpload>
                    </div>
                </div>
                <div class="flex justify-content-end">
                    <Button class="ml-2" :loading="isSubmit" type="submit" size="small" label="Create" />
                </div>
            </form>
        </Dialog>
        <Toast />
    </div>
</template>
<script setup lang="ts">
import Editor from 'primevue/editor';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    visible: Boolean
});
const emit = defineEmits(['hide', 'course-created']);

const { $api } = useNuxtApp();

const toast = useToast();
const { handleSubmit, handleReset } = useForm();

const isSubmit = ref(false);

const about = ref('');
const background = ref();

const { value: courseName, errorMessage: courseNameErrorMessage } = useField<string>('courseName', useYup().string().required());
const { value: description, errorMessage: descriptionErrorMessage } = useField<string>('description', useYup().string().max(256));
const { value: invitations, errorMessage: invitationsErrorMessage } = useField('invitations', isEmail);

const isAddCourse = ref(false);

const onSelect = (event: any) => {
    background.value = event.files[0];
}

const submit = handleSubmit(async (values) => {
    isSubmit.value = true;

    const formData = new FormData();
    formData.append('cover_photo', background.value);
    formData.append('name', values.courseName);
    formData.append('description', description.value);
    formData.append('about', about.value);
    values.invitations.forEach((invitation: any) => {
        formData.append('invitations[]', invitation)
    });


    const { data } = await $api.team.create({
        body: formData, headers: { 'Accept': 'application/json' }
    });
    isSubmit.value = false;
    useShowToast(data, toast);
    handleReset();
    about.value = '';
    background.value = null;
    emit('course-created');
});

function isEmail(val: any) {
    if (val) {
        const email = val[val.length - 1]
        const schema = useYup().string().email()
        return schema.isValid(email);
    }
}

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