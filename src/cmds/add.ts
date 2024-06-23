import keytar from "keytar";
import type { Arguments } from "yargs";
import type { Vbusy } from "../lib/vbusy.js";
import { Command } from "../lib/command.js";

interface Options {
    task: string;
    priority: string;
}

export default class AddCmd extends Command {
    constructor(vbusy: Vbusy) {
        super(vbusy, {
            name: "add",
            desc: "add a new task",
            aliases: ["create", "+"],
            options: {
                task: {
                    alias: "task",
                    describe: "create a new task",
                    type: "string",
                    demandOption: true,
                },
                priority: {
                    alias: "p",
                    describe: "specify a priority level for this task",
                    type: "string",
                    default: "low",
                },
            }
        });
    }

    public async run(argv: Arguments<Options>): Promise<void> {
        const token = await keytar.getPassword("tasks", "token") as string;

        const { task, priority } = argv;

        const newTask = await this.vbusy.api.taskRepository.create(token, { task, priority });
        console.log(`📌 Noted! Created a new task: ${newTask.task}`);
    }
}