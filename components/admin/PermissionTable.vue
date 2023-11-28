<template>
	<div>
		<AdminUpdatePermissionDialog :visible="isViewCog" @hide="isViewCog = false" :permission="permissionConfig" @update-permission="emit('update-permission')"/>
		<DataTable :loading="loading" :value="permissions" tableStyle="min-width: 50rem">
			<template #empty>
				<div class="flex justify-content-center">No permissions found.</div>
			</template>
			<Column field="id">
				<template #header>
					<div class="flex-1 text-center">id</div>
				</template>
				<template #body="slotProps">
					<div class="flex-1 text-center">
						{{ slotProps.data.id }}
					</div>
				</template>
			</Column>
			<Column field="name">
				<template #header>
					<div class="flex-1 text-center">Name</div>
				</template>
				<template #body="slotProps">
					<div class="flex-1 text-center">
						{{ slotProps.data.name }}
					</div>
				</template>
			</Column>
			<Column>
				<template #header>
					<div class="flex-1 text-center">Action</div>
				</template>
				<template #body="slotProps">
					<div class="flex-1 text-center">
						<Button @click="viewPermissionConfig(slotProps.data)" severity="secondary" size="small" icon="pi pi-cog" />
					</div>
				</template>
			</Column>
		</DataTable>
		<Paginator v-model:first="currentPage" :rows="rows" :totalRecords="totalRecords" @page="pageChange" />
	</div>
</template>
<script setup lang="ts">
const props = defineProps({
	permissions: Array,
	totalRecords: Number,
	loading: Boolean,
	rows: Number,
});

const emit = defineEmits(['page-change', 'update-permission']);

const route = useRoute();
const currentPage = ref(1);

watch(
	() => route.query,
	() => {
		currentPage.value = (route.query.page - 1) * props.rows;
	},
	{ deep: true, immediate: true }
);

const isViewCog = ref(false);
const permissionConfig = ref({});

const pageChange = (page: any) => {
	emit('page-change', page.page + 1);
};

const viewPermissionConfig = (permission: any) => {
	permissionConfig.value = { ...permission };
	isViewCog.value = true;
};
</script>
