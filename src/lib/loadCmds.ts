import type { Argv } from "yargs";
import type { Command } from "./command.js";
import * as Commands from "../cmds/index.js";

export function loadCmds(yargs: Argv): void {
    const modules = Object.values(Commands);

    for (const Module of modules) {
        const cmd: Command = new Module();

        yargs.command({
            command: cmd.name,
            describe: cmd.desc,
            aliases: cmd.aliases,
            handler: (argv) => cmd.run(argv),
        });
    }
}