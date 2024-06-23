import axios from "axios";
import { TaskRepository, UserRepository } from "../repositories/index.js";

export class API {
    private api;
    public taskRepository: TaskRepository;
    public userRepository: UserRepository;

    constructor() {
        this.api = axios.create({
            baseURL: process.env.API_BASE_URL || "http://localhost:8080/api/v1/",
        });

        this.taskRepository = new TaskRepository(this);
        this.userRepository = new UserRepository(this);
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