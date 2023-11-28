import HttpFactory from "../factory";

class Role extends HttpFactory {
    async create(options: object = {}): Promise<any> {
        return await this.call('v1/role', { method: 'POST', ...options });
    }

    async get(id: number, options: object = {}): Promise<any> {
        return await this.call(`v1/role/${id}`, { method: 'GET', ...options });
    }

    async list(options: object = {}): Promise<any> {
        return await this.call('v1/role', { method: 'GET', ...options });
    }

    async update(id: number, options: object = {}): Promise<any> {
        return await this.call(`v1/role/${id}`, { method: 'PUT', ...options });
    }
    async paginate(page: number = 1, search: string = '', options: object = {}): Promise<any> {
        return await this.call(`v1/role/paginate?page=${page}&search=${search}`, { method: 'GET', ...options });
    }

    async switchRole(id: number, options: object = {}): Promise<any> {
        return await this.call(`v1/role/${id}/switch`, { method: 'PUT', ...options });
    }


}

export default Role;