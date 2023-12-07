<template>
    <div @focus="emit('focus')" class="border-1 border-300 border-round p-2 overflow-auto" contenteditable="true"
        :style="`max-height: ${maxHeight}px; min-height: ${minHeight}px;`" :placeholder="placeholder" @input="input">
    </div>
</template>
<script setup lang="ts">
defineProps({
    placeholder: String,
    maxHeight: {
        type: String,
        default: '126'
    },
    minHeight: {
        type: String,
        default: '126'
    }
})

const emit = defineEmits(['input', 'focus']);

const input = (event: any) => {
    emit('input', event.target.innerHTML);
}
</script>
<style scoped>
[contenteditable] {
    outline: 0px solid transparent;
}

[placeholder]:empty::before {
    content: attr(placeholder);
    color: #8d8d8d;
}

[placeholder]:empty:focus::before {
    content: "";
}
</style>