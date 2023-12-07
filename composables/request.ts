let errorMessage:string = '';

export const useShowToast = (data:any, toast:any) => {
	if (data.value) {
		toast.add({ severity: 'success', summary: data.value.title ?? 'Success', detail: data.value.message, life: 3000 });
	} else {
		toast.add({ severity: 'error', summary: 'Oops!', detail: useGetErrorMessage(), life: 3000 });
	}
};

export const useGetErrorMessage = () => {
	return errorMessage;
};

export const useRequest = async (url: string, options = {}) => {
	return useFetch(useRuntimeConfig().public.apiUrl + '/api/' + url, {
        ...options,
		onRequest({ request, options }) {
			// Set the request headers
			options.headers = options.headers || {};
			options.headers.authorization = `Bearer ${useCookie('token').value}`;
		},
		onRequestError({ request, options, error }) {
			// Handle the request errors
		},
		onResponse({ request, response, options }) {
			// Process the response data
			// localStorage.setItem('token', response._data.token);
		},
		onResponseError({ request, response, options }) {
			errorMessage = 'There was an issue. Please try again later.';
			errorMessage = response.status >= 400 && response.status < 422 ? response._data.error : errorMessage;
			if (response.status == 422) {
				errorMessage = '';
				for (const key in response._data.errors) {
					response._data.errors[key].forEach((error: any) => {
						errorMessage += `${error} `;
					});
				}
			}
			return errorMessage;
		},
	});
};
