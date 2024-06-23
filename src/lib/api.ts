import axios from "axios";
import { TaskService, UserService } from "../services/index.js";

export class API {
    private api;
    public taskService: TaskService;
    public userService: UserService;

    constructor() {
        this.api = axios.create({
            baseURL: process.env.API_BASE_URL || "http://localhost:8080/api/v1/",
        });

        this.taskService = new TaskService(this);
        this.userService = new UserService(this);
    }

    async request(method: string, url: string, data?: any, headers?: any) {
        try {
            const response = await this.api.request({
                method,
                url,
                data,
                headers,
            });

            if (response.status !== 200) {
                throw new Error(`Request failed with status code ${response.status}`);
            }

            return response.data;
        } catch (error) {
            console.error("API request failed:", error);
            throw error;
        }
    }
}