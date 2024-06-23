import type { API } from "../lib/api.js";

export class TaskService {
    private api: API;

    constructor(api: API) {
        this.api = api;
    }

    async create(token: string, task: string, priority: string, dueDate: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("post", "tasks", { task, priority, dueDate }, headers);
    }

    async get(token: string, id: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("get", `tasks/${id}`, null, headers);
    }

    async getAll(token: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("get", "tasks", null, headers);
    }

    async delete(token: string, id: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("delete", `tasks/${id}`, null, headers);
    }

    async update(token: string, id: string, newTask: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("put", `tasks/${id}`, { task: newTask }, headers);
    }

    async completeTask(token: string, id: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("put", `tasks/${id}/complete`, null, headers);
    }

    async updateDueDate(token: string, id: string, date: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("put", `tasks/${id}/due`, { dueDate: date }, headers);
    }

    async updatePriority(token: string, id: string, priority: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("put", `tasks/${id}/priority`, { priority }, headers);
    }

    async archive(token: string, id: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("put", `tasks/${id}/archive`, null, headers);
    }

    async purge(token: string, userId: string) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.api.request("delete", `tasks/${userId}/purge`, null, headers);
    }
}