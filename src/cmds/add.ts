import type { Vbusy } from "../lib/vbusy.js";
import { Command } from "../lib/command.js";
import type { Argv } from "yargs";

export default class AddCmd extends Command {
    constructor(vbusy: Vbusy) {
        super(vbusy, {
            name: "add",
            desc: "add a new task",
            aliases: ["create", "+"]
        });
    }

    public run(argv: Argv): void {
        console.log("Add command executed!");
    }
}