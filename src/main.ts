import yargs from "yargs";
import { loadCmds } from "./lib/loadCmds.js";

yargs.scriptName("vbusy")
    .usage("$0 <cmd> [args]")
    .help();

loadCmds(yargs);

yargs.demandCommand(1, "You need at least one command before moving on.").argv;