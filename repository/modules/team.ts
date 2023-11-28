import HttpFactory from "../factory";

class Team extends HttpFactory {

    async create(options: object = {}) {
        return await this.call('v1/team', { method: 'POST', ...options });
    }

    async paginate(page: number = 1, search: string = '', options: object = {}) {
        return await this.call(`v1/team/paginate?page=${page}&search=${search}`, { method: 'GET', ...options });
    }
}

export default Team;