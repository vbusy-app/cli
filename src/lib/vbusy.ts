import fs from "node:fs";
import yargs, { type Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import * as Commands from "../cmds/index.js";
import {
	deleteAllData,
	handleLogin,
	isAuthenticated,
	promptDashboard,
	promptLogin,
} from "../utils/index.js";
import { API } from "./api.js";
import type { Command } from "./command";

export class Vbusy {
	private yargsInstance: Argv;

	public commands: Map<string, Command> = new Map();
	public api: API;

	constructor() {
		this.yargsInstance = yargs(hideBin(process.argv))
			.scriptName("vbusy")
			.usage("$0 <cmd> [args]")
			.help();
		this.yargsInstance.middleware(async (argv) => {
			const authenticated = await isAuthenticated();
			if (!authenticated) {
				const bee = fs.readFileSync("assets/bee.txt", "utf8");
				console.log(bee);

				promptLogin(this, this.api.userRepository);
				return;
			}

			if (!argv._.length) {
				setTimeout(async () => {
					await promptDashboard(this, this.api.userRepository);
				}, 1000);
			}

			await handleLogin(this.api.userRepository);
		});

		this.api = new API();
	}

	private async loadCmds(): Promise<void> {
		const modules = Object.values(Commands);

		for (const Module of modules) {
			const cmd: Command = new Module(this);

			this.commands.set(cmd.name, cmd);

			this.yargsInstance.command({
				command: cmd.name,
				describe: cmd.desc,
				aliases: cmd.aliases,
				builder: (argv: yargs.Argv<unknown>) => argv.options(cmd.options),
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
