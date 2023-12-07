<template>
    <div class="relative">
        <NuxtLoadingIndicator color="primary" />
        <Header class="sticky top-0 bg-white shadow-3" style="z-index: 2;" />
        <div class="grid grid-nogutter">
            <div class="hidden xl:col-2 xl:block">
                <Navigation />
            </div>
            <div class="col-12 xl:col-10 pt-5">
                <NuxtPage />
            </div>
        </div>
        <Footer class="mt-5" />
    </div>
</template>
<script setup lang="ts">
useHead({
    title: 'Edulinx'
});
</script>
<style>
html,
body {
    padding: 0;
    margin: 0;
}
</style>