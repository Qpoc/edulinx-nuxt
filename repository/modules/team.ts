import HttpFactory from "../factory";

class Team extends HttpFactory {

    async create(options: object = {}) {
        return await this.call('v1/team', { method: 'POST', ...options });
    }

    async get(id: number, options: object = {}) {
        return await this.call(`v1/team/${id}`, { method: 'GET', ...options });
    }

    async paginate(page: number = 1, search: string = '', options: object = {}) {
        return await this.call(`v1/team/paginate?page=${page}&search=${search}`, { method: 'GET', ...options });
    }

    async acceptInvite(token: string, options: object = {}) {
        return await this.call(`v1/team/accept-invite/${token}`, { method: 'GET', ...options });
    }

    async validateToken(token: string, options: object = {}) {
        return await this.call(`v1/guest-course/accept-invite/${token}`, { method: 'GET', ...options });
    }
}

export default Team;