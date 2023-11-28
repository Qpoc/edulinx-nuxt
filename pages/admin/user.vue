<template>
    <div>
        <Card>
            <template #title>
                <div class="flex justify-content-between">
                    <div class="flex align-items-center">
                        <InputText v-model.lazy="search" placeholder="Search" />
                    </div>
                    <div class="flex justify-content-end">
                        <AdminCreateUserDialog @create-user="paginateUser()" />
                    </div>
                </div>
            </template>
            <template #content>
                <AdminUserTable @update-user="paginateUser(route.query?.page, route.query?.search)" :rows="rows"
                    :loading="isTableLoading" :users="users" :total-records="totalRecords" @page-change="nextPage" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: ['admin']
});

const { $api } = useNuxtApp();

const users = ref([]);
const isSearching = ref();
const search = ref('');
const totalRecords = ref(1);
const rows = ref(1);
const isTableLoading = ref(false);
const route: any = useRoute();

const paginateUser = async (page = 1, search = '') => {
    isTableLoading.value = true;
    const { data }: any = await $api.user.paginate(page, search);
    users.value = data.value.data;
    totalRecords.value = data.value.total;
    rows.value = data.value.per_page;
    isTableLoading.value = false;
};

await paginateUser(route.query?.page, route.query?.search);

const nextPage = async (page: number) => {
    const query: any = { page: page };

    if (search.value) {
        query.search = search.value;
    }

    return navigateTo({ name: 'admin-user', query: query });
};

watch(search, async (value: string) => {
    if (value) {
        clearTimeout(isSearching.value);
    }
    isSearching.value = setTimeout(() => {
        nextPage(1);
    }, 1000);
});

watch(
    () => route.query,
    async (query: any) => {
        await paginateUser(query?.page, query?.search);
    },
    { deep: true }
);
</script>
