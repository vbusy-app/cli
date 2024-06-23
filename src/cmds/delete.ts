import { confirm } from "@inquirer/prompts";
import keytar from "keytar";
import type { Arguments } from "yargs";
import type { Vbusy } from "../lib/vbusy.js";
import { Command } from "../lib/command.js";
import { taskSelection } from "../utils/helpers.js";

export default class DeleteCmd extends Command {
    constructor(vbusy: Vbusy) {
        super(vbusy, {
            name: "delete",
            desc: "delete a task",
            aliases: ["del", "-"],
        });
    }

    public async run(argv: Arguments): Promise<void> {
        const token = await keytar.getPassword("tasks", "token") as string;
        
        const tasks = await this.vbusy.api.taskRepository.getAll(token);
        const selectedTask = await taskSelection("delete", tasks);

        const confirmMessage = await confirm({ message: "Are you sure you want to delete this task?" });
        if (!confirmMessage) {
            console.log("❌ Cancelled task deletion.");
            return;
        }

        await this.vbusy.api.taskRepository.delete(token, selectedTask);
        console.log("✅ Deleted task!");
    }
}