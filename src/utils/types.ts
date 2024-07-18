import type { Options } from "yargs";

export interface CommandOptions {
	name: string;
	desc: string;
	aliases?: string[];
	options?: { [key: string]: Options };
}

export type Task = {
	completed: boolean;
	dueDate?: string;
	archived?: boolean;
	task: string;
	priority: "low" | "medium" | "high";
};
