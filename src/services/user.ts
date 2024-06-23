import type { API } from "../lib/api.js";

export class UserService {
    private api: API;

    constructor(api: API) {
        this.api = api;
    }

    async login(email: string, password: string) {
        return this.api.request("post", "login", { email, password });
    }

    async logout() {
        return this.api.request("post", "logout");
    }

    async get(token: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("get", "profile", null, headers);
    }
}