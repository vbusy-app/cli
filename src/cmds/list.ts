import { Command } from "../lib/command.js";
import type { Argv } from "yargs";

export default class ListCmd extends Command {
    constructor() {
        super({
            name: "list",
            desc: "view a list of all of your tasks",
            aliases: ["ls"]
        });
    }

    public run(argv: Argv): void {
        console.log("Listing command executed!");
    }
}