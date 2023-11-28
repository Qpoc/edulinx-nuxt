export const useGetPermission = async (options: object = {}) => {
	return await useRequest('v1/permission', { ...options });
};

export const usePaginatePermission = async (page = 1, search = '') => {
    return await useRequest(`v1/permission/paginate?page=${page}&search=${search}`);
};

export const useCreatePermission = async (options = {}) => {
    return await useRequest('v1/permission', { method: 'POST', ...options });
};

export const useUpdatePermission = async (id: number, options = {}) => {
    return await useRequest(`v1/permission/${id}`, { method: 'PUT', ...options });
};