import HttpFactory from '../factory';


class Auth extends HttpFactory {
    async login(options: object = {}): Promise<any> {
        return this.call('login', { method: 'POST', ...options });
    }

    async register(options: object = {}): Promise<any> {
        return this.call('register', { method: 'POST', ...options });
    }

    async logout(options: object = {}): Promise<any> {
        return this.call('logout', { method: 'POST', ...options });
    }
}

export default Auth;