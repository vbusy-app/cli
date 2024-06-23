import chalk from "chalk";
import Table from "cli-table";
import keytar from "keytar";
import moment from "moment";
import type { Vbusy } from "../lib/vbusy.js";
import { Command } from "../lib/command.js";
import { formatDueDate, type Task } from "../utils/index.js";
import type { Argv } from "yargs";

export default class ListCmd extends Command {
    constructor(vbusy: Vbusy) {
        super(vbusy, {
            name: "list",
            desc: "view a list of all of your tasks",
            aliases: ["ls"]
        });
    }

    public async run(argv: Argv): Promise<void> {
        let count = 1;

        const token = await keytar.getPassword("tasks", "token");
        const tasks = await this.vbusy.api.taskRepository.getAll(token as string) as Task[];

        if (!tasks || !tasks.length) {
            console.log("You haven't made any tasks. :~(");
            return;
        }

        const table = new Table({
            head: [chalk.bgYellow.black("ID"), chalk.bgYellow.black("Completed"), chalk.bgYellow.black("Due"), chalk.bgYellow.black("Priority"), chalk.bgYellow.black("Task")],
            colWidths: [4, 10, 14, 8, 30],
            chars: {
                "top": "", "top-mid": "", "top-left": "", "top-right": "",
                "bottom": "", "bottom-mid": "", "bottom-left": "", "bottom-right": "",
                "left": "", "left-mid": "", "mid": "", "mid-mid": "",
                "right": "", "right-mid": "", "middle": " ",
            },
            style: { "padding-left": 0, "padding-right": 0, "compact": true },
        });

        const currentDate = moment();

        for (const task of tasks) {
            const completed = task.completed ? chalk.green("[✔]") : "[ ]";
            const taskId = chalk.blue(count++);
            const taskName = task.archived ? chalk.gray(`[archived] ${task.task}`) : task.task;

            let dueDateMsg = " ";

            if (task.dueDate) {
                const dueDateValue = moment(task.dueDate);
                const timeDifference = dueDateValue.diff(currentDate, "days");

                if (timeDifference === 0) {
                    dueDateMsg = task.completed ? chalk.yellow("Today") : chalk.red("Today");
                } else if (timeDifference === 1) {
                    dueDateMsg = chalk.yellow("Tomorrow");
                } else if (timeDifference < 0) {
                    dueDateMsg = chalk.red(formatDueDate(task.dueDate));
                } else {
                    dueDateMsg = formatDueDate(task.dueDate);
                }
            }

            const priority = {
                low: chalk.green("low"),
                medium: chalk.yellow("med"),
                high: chalk.red("high"),
            }[task.priority];

            table.push([taskId, completed, dueDateMsg, priority, taskName]);
        }

        console.log("\nTask List");
        console.log(table.toString());
    }
}