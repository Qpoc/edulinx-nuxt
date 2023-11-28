import Auth from "~/repository/modules/auth";
import Role from "~/repository/modules/role";
import User from "~/repository/modules/user";
import Permission from "~/repository/modules/permission";
import Team from "~/repository/modules/team";

interface apiInstance {
    auth: Auth,
    role: Role,
    user: User,
    permission: Permission,
    team: Team
}

export default defineNuxtPlugin((nuxtApp) => {
    const modules: apiInstance = {
        auth: new Auth(),
        role: new Role(),
        user: new User(),
        permission: new Permission(),
        team: new Team()
    }

    return {
        provide: {
            api: modules
        }
    }
});