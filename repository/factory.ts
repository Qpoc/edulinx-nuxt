class HttpFactory {
    async call(url:string, options:Object = {}) {
        return await useRequest(url, options);
    }
}

export default HttpFactory;