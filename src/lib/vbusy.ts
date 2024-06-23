import fs from "node:fs";
import keytar from "keytar";
import yargs, { type Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import * as Commands from "../cmds/index.js";
import { deleteAllData, handleLogin, isAuthenticated, promptDashboard, promptLogin } from "../utils/index.js";
import { API } from "./api.js";
import type { Command } from "./command";

export class Vbusy {
    private yargsInstance: Argv;
    public api: API;

    constructor() {
        this.yargsInstance = yargs(hideBin(process.argv)).scriptName("vbusy")
            .usage("$0 <cmd> [args]")
            .help();
        this.yargsInstance.middleware(async (argv) => {
            const authenticated = await isAuthenticated();
            if (!authenticated) {
                const bee = fs.readFileSync("assets/bee.txt", "utf8");
                console.log(bee);

                promptLogin(this.api.userService);
                return;
            }

            await handleLogin(this.api.userService);
            await promptDashboard(this.api.userService);
        });

        this.api = new API();
    }

    private loadCmds(): void {
        const modules = Object.values(Commands);

        for (const Module of modules) {
            const cmd: Command = new Module(this);

            keytar.setPassword("cmdList", "cmds", JSON.stringify(modules));

            this.yargsInstance.command({
                command: cmd.name,
                describe: cmd.desc,
                aliases: cmd.aliases,
                handler: async (argv) => cmd.run(argv),
            });
        }
    }

    public init(): void {
        // deleteAllData();
        this.loadCmds();
        this.yargsInstance.argv;
    }
}