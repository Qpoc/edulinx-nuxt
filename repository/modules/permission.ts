import HttpFactory from "../factory";

class Permission extends HttpFactory {

    async list(options: object = {}): Promise<any> {
        return await this.call('v1/permission', { method: 'GET', ...options });
    }

    async get(id: number, options: object = {}): Promise<any> {
        return await this.call(`v1/permission/${id}`, { method: 'GET', ...options });
    }

    async create(options: object = {}): Promise<any> {
        return await this.call('v1/permission', { method: 'POST', ...options });
    }

    async update(id: number, options: object = {}): Promise<any> {
        return await this.call(`v1/permission/${id}`, { method: 'PUT', ...options });
    }

    async paginate(page: number = 1, search: string = '', options: object = {}): Promise<any> {
        return await this.call(`v1/permission/paginate?page=${page}&search=${search}`, { method: 'GET', ...options });
    }
}

export default Permission;