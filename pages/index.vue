<template>
    <div>
        <div class="grid grid-nogutter">
            <div class="cover col-12 lg:col-6 lg:flex lg:align-items-center lg:justify-content-center">
                <Image alt="Image">
                    <template #image>
                        <img src="~/assets/background/tutor.jpg" contain />
                    </template>
                </Image>
            </div>
            <div class="col-12 lg:col-6 flex align-items-center justify-content-center">
                <Card class="shadow-none lg:p-8">
                    <template #title>
                        <div class="text-3xl text-center lg:text-justify">
                            Empower Education with <span class="text-primary font-bold">Edulinx</span>
                        </div>
                    </template>
                    <template #subtitle>
                        <div class="font-bold text-center lg:text-justify">
                            Your Gateway to Dynamic Learning <span>Experiences</span>
                        </div>
                    </template>
                    <template #content>
                        <div class="text-center lg:text-justify">
                            Welcome to Edulinx, where learning meets innovation. Our platform is designed to transform
                            education
                            into an immersive and empowering experience. With a diverse range of courses and collaborative
                            tools, we foster a community-driven approach to learning. Explore our dynamic features, connect
                            with
                            experts, and embark on a journey toward your educational aspirations.
                        </div>
                    </template>
                    <template #footer>
                        <div class="flex justify-content-center lg:justify-content-start">
                            <Button label="Discover Features" />
                        </div>
                    </template>
                </Card>
            </div>
        </div>
        <Divider align="center">
            <b class="text-5xl text-primary">Features</b>
        </Divider>
        <div class="grid grid-nogutter align-items-center">
            <div class="col-6 cover-quiz hidden lg:flex justify-content-center">
                <Image alt="Image">
                    <template #image>
                        <img src="~/assets/images/quiz.jpg" />
                    </template>
                </Image>
            </div>
            <div class="col-12 lg:col-6 flex justify-content-center">
                <Card style="width: 100rem;" class="flex shadow-none justify-content-center">
                    <template #title>
                        <span class="text-5xl text-primary">Quizzes Made Simple</span>
                    </template>
                    <template #subtitle>
                        <div class="text-justify text-lg">
                            Assessment Made Engaging
                        </div>
                    </template>
                    <template #content>
                        <ul>
                            <li><span class="text-primary font-bold">Effortless Creation:</span> Easily generate quizzes
                                with our user-friendly interface.</li>
                            <li><span class="text-primary font-bold">Customization Options:</span> Tailor questions and
                                formats to match your teaching style.</li>
                            <li><span class="text-primary font-bold">Seamless Editing:</span> Modify existing quizzes for
                                continual improvement.</li>
                            <li><span class="text-primary font-bold">Diverse Question Formats:</span> Choose from a range of
                                question types to diversify assessments.
                            </li>
                        </ul>
                    </template>
                </Card>
            </div>
            <div v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }"
                class="col-12 lg:col-6 flex justify-content-center">
                <Card style="width: 100rem;" class="flex shadow-none justify-content-center">
                    <template #title>
                        <span class="text-5xl text-primary">Classroom Collaboration Hub</span>
                    </template>
                    <template #subtitle>
                        <div class="text-justify text-lg">
                            Where Learning Unites and Flourishes
                        </div>
                    </template>
                    <template #content>
                        <ul>
                            <li><span class="text-primary font-bold">Interactive Communication:</span> Enable real-time
                                discussions and engagement between teachers and students within a collaborative space.</li>
                            <li><span class="text-primary font-bold">Resource Sharing:</span> Seamlessly distribute
                                educational materials, assignments, and additional resources among the classroom
                                participants.</li>
                            <li><span class="text-primary font-bold">Progress Tracking:</span> Monitor and evaluate
                                individual student progress and performance within the classroom setting.</li>
                            <li><span class="text-primary font-bold">Task Assignment and Management:</span> Efficiently
                                assign tasks, manage deadlines, and track completion to keep the learning process organized
                                and focused.
                            </li>
                        </ul>
                    </template>
                </Card>
            </div>
            <div v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }"
                class="col-6 cover-quiz hidden lg:flex justify-content-center">
                <Image alt="Image">
                    <template #image>
                        <img src="~/assets/images/collab.jpg" />
                    </template>
                </Image>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'guest'
});
</script>
<style scoped>
.cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
}

.cover-quiz img {
    width: 30rem;
    object-fit: contain;
    overflow: hidden;
}


.p-divider-solid.p-divider-horizontal:before {
    border-top-style: solid !important;
}


.p-divider.p-divider-horizontal:before {
    border-top: 1px #000000;
}
</style>