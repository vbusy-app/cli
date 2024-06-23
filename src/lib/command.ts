import type { Vbusy } from "./vbusy.js";
import type { CommandOptions } from "../utils/index.js";

export abstract class Command {
    public vbusy: Vbusy;
    public readonly name: string;
    public readonly desc: string;
    public readonly aliases: string[];

    public constructor(vbusy: Vbusy, options: CommandOptions) {
        this.vbusy = vbusy;
        this.name = options.name;
        this.desc = options.desc;
        this.aliases = options.aliases ?? [];
    }

    // biome-ignore lint/suspicious/noExplicitAny:
    public abstract run(argv: any): void;
}