export interface CommandOptions {
    name: string;
    desc: string;
    aliases?: string[];
}

export type Task = {
    completed: boolean;
    dueDate?: string;
    archived?: boolean;
    task: string;
    priority: "low" | "medium" | "high";
}