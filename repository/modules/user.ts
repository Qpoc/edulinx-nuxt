import HttpFactory from "../factory";

class User extends HttpFactory {
    async create(options: object = {}): Promise<any> {
        return await this.call('v1/user', { method: 'POST', ...options });
    }

    async get(id: number, options: object = {}): Promise<any> {
        return await this.call(`v1/user/${id}`, { method: 'GET', ...options });
    }

    async list(options: object = {}): Promise<any> {
        return await this.call('v1/user', { method: 'GET', ...options });
    }

    async update(id: number, options: object = {}): Promise<any> {
        return await this.call(`v1/user/${id}`, { method: 'PUT', ...options });
    }

    async paginate(page: number = 1, search: string = '', options: object = {}): Promise<any> {
        return await this.call(`v1/user/paginate?page=${page}&search=${search}`, { method: 'GET', ...options });
    }
}

export default User;