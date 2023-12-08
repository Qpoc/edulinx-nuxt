<template>
    <Card>
        <template #content>
            <Mentionable :keys="['@']" :items="users" offset="6" insert-space @apply="mention">
                <Editable id="editable" placeholder="Start a discussion" />

                <template #no-result>
                    <div class="dim">
                        No result
                    </div>
                </template>

                <template #item-@="{ item }">
                    <div class="mention-item border-noround">
                        <span class="dim">
                            ({{ item.firstName }})
                        </span>
                    </div>
                </template>
            </Mentionable>
        </template>
        <template #footer>
            <div class="grid grid-nogutter">
                <div class="col-12">
                    <Button size="small" label="Post" class="w-full" :disabled="post.length <= 0" />
                </div>
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { Mentionable } from 'vue-mention'

const post = ref('');
const editable = ref(null);
const users = ref([
    {
        value: 'akryum',
        firstName: 'Guillaume',
    },
    {
        value: 'posva',
        firstName: 'Eduardo',
    },
    {
        value: 'atinux',
        firstName: 'Sébastien',
    },
]);

const mention = (text: any) => {
    
}


</script>
<style scoped>
.mention-item {
    padding: 4px 6px;
    border-radius: 4px;
    cursor: pointer;
}

.mention-selected .mention-item {
    color: white;
    background: var(--primary-400);
}

.mention-item .number {
    font-family: monospace;
}
</style>