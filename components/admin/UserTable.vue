<template>
	<div>
		<AdminUpdateUserDialog :visible="isViewCog" @update-user="emit('update-user')" @hide="isViewCog = false" :user="userConfig"/>
		<DataTable :loading="loading" :value="users">
			<template #empty>
				<div class="flex justify-content-center">No users found.</div>
			</template>
			<Column field="id" header="id"></Column>
			<Column field="first_name" header="First Name"></Column>
			<Column field="last_name" header="Last Name"></Column>
			<Column field="email" header="Email"></Column>
			<Column header="Action">
				<template #body="slotProps">
					<Button @click="viewUserConfig(slotProps.data)" severity="secondary" size="small" icon="pi pi-cog" />
				</template>
			</Column>
		</DataTable>
		<Paginator v-model:first="currentPage" :rows="rows" :totalRecords="totalRecords" @page="pageChange" />
	</div>
</template>
<script setup lang="ts">
const props = defineProps({
	users: Array,
	totalRecords: Number,
	loading: Boolean,
	rows: Number,
});

const route = useRoute();
const currentPage = ref(1)

watch(() => route.query, () => {
	currentPage.value = (route.query.page - 1) * props.rows;
}, {deep: true, immediate: true})

const isViewCog = ref(false);
const userConfig = ref({});

const emit = defineEmits(['page-change', 'update-user']);

const pageChange = (page: any) => {
	emit('page-change', page.page + 1);
};

const viewUserConfig = (user: any) => {
	userConfig.value = {...user};
	isViewCog.value = true;
};
</script>
