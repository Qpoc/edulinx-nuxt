<template>
    <div>
        <Header class="sticky top-0 bg-white shadow-3" style="z-index: 2;" />
        <slot />
        <Footer />
    </div>
</template>
<style>
html,
body {
    padding: 0;
    margin: 0;
}
</style>