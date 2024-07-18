import type { Options } from "yargs";
import type { CommandOptions } from "../utils/index.js";
import type { Vbusy } from "./vbusy.js";

export abstract class Command {
	public vbusy: Vbusy;
	public readonly name: string;
	public readonly desc: string;
	public readonly aliases: string[];
	public readonly options: { [key: string]: Options };

	public constructor(vbusy: Vbusy, options: CommandOptions) {
		this.vbusy = vbusy;
		this.name = options.name;
		this.desc = options.desc;
		this.aliases = options.aliases ?? [];
		this.options = options.options ?? {};
	}

	public abstract run(argv: any): void;
}
