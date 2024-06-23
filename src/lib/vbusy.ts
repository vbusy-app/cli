import yargs, { type Argv } from "yargs";
import * as Commands from "../cmds/index.js";
import type { Command } from "./command";

export class Vbusy {
    private yargsInstance: Argv;

    constructor() {
        this.yargsInstance = yargs.scriptName("vbusy")
            .usage("$0 <cmd> [args]")
            .help();
    }

    private loadCmds(): void {
        const modules = Object.values(Commands);

        for (const Module of modules) {
            const cmd: Command = new Module();

            this.yargsInstance.command({
                command: cmd.name,
                describe: cmd.desc,
                aliases: cmd.aliases,
                handler: (argv) => cmd.run(argv),
            });
        }
    }

    public init(): void {
        this.loadCmds();
        this.yargsInstance.demandCommand(1, "Missing 1 command.");
    }
}