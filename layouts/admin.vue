<template>
    <div>
        <NuxtLoadingIndicator color="primary" />
        <Header />
        <div class="grid grid-nogutter">
            <div class="hidden xl:col-2 xl:block">
                <AdminNavigation />
            </div>
            <div class="col-12 xl:col-10 pt-5">
                <NuxtPage />
            </div>
        </div>
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