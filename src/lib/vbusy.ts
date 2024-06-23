import yargs, { type Argv } from "yargs";
import * as Commands from "../cmds/index.js";
import type { Command } from "./command";
import { API } from "./api.js";

export class Vbusy {
    private yargsInstance: Argv;
    public api: API;

    constructor() {
        this.yargsInstance = yargs.scriptName("vbusy")
            .usage("$0 <cmd> [args]")
            .help();

        this.api = new API();
    }

    private loadCmds(): void {
        const modules = Object.values(Commands);

        for (const Module of modules) {
            const cmd: Command = new Module(this);

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