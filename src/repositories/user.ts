import type { API } from "../lib/api.js";

export class UserRepository {
	private api: API;

	constructor(api: API) {
		this.api = api;
	}

	async login(email: string, password: string) {
		return this.api.request("post", "users/login", { email, password });
	}

	async logout() {
		return this.api.request("post", "users/logout");
	}

	async get(token: string, userId: string) {
		const headers = {
			Authorization: `Bearer ${token}`,
		};

		return this.api.request("get", `users/profile/${userId}`, null, headers);
	}
}
