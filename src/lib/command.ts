import type { CommandOptions } from "../utils/index.js";
import type { Argv } from "yargs";

export abstract class Command {
    public readonly name: string;
    public readonly desc: string;
    public readonly aliases: string[];

    public constructor(options: CommandOptions) {
        this.name = options.name;
        this.desc = options.desc;
        this.aliases = options.aliases ?? [];
    }

    // biome-ignore lint/suspicious/noExplicitAny:
    public abstract run(argv: any): void;
}