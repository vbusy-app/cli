import { select } from "@inquirer/prompts";
import chalk from "chalk";
import clear from "clear";
import Table from "cli-table";
import figlet from "figlet";
import inquirer from "inquirer";
import keytar from "keytar";
import type { Vbusy } from "../lib/vbusy.js";
import type { UserRepository } from "../repositories/user.js";
import { formatOptions } from "./formatters.js";
import { isValidEmail } from "./validators.js";

export const isAuthenticated = async (): Promise<boolean> => {
	const token = await keytar.getPassword("tasks", "token");
	return !!token;
};

export const handleLogin = async (
	userRepository: UserRepository,
): Promise<void> => {
	const token = await keytar.getPassword("tasks", "token");
	const userId = await keytar.getPassword("user", "userId");

	const data = await userRepository.get(token as string, userId as string);

	console.log(`🌱 Logged in as ${data.username}`);
};

export const handleLogout = async (
	userRepository: UserRepository,
): Promise<void> => {
	console.log("Logging out... Cya! 🐝");

	try {
		await userRepository.logout();
		await keytar.deletePassword("tasks", "token");
		await keytar.deletePassword("user", "userId");
	} catch (error) {
		console.error("Error during logout:", error);
	}

	process.exit();
};

export const promptLogin = (vbusy: Vbusy, userRepository: UserRepository) => {
	inquirer
		.prompt([
			{
				type: "input",
				name: "email",
				message: "Enter your email:",
				validate: async (value) => {
					if (!value) {
						return "Please provide your vbusy email!";
					}

					const validateEmail = isValidEmail(value);
					if (!validateEmail) {
						return "Please provide a valid email address!";
					}

					return validateEmail;
				},
			},
			{
				type: "password",
				name: "password",
				message: "Enter your password:",
				mask: "•",
			},
		])
		.then(async ({ email, password }) => {
			try {
				const response = await userRepository.login(email, password);
				if (response?._id && response.token) {
					const userId = response._id;
					const token = response.token;

					await keytar.setPassword("user", "userId", userId);
					await keytar.setPassword("tasks", "token", token);

					await handleLogin(userRepository);

					setTimeout(async () => {
						await promptDashboard(vbusy, userRepository);
					}, 1000);
				}
			} catch (error) {
				console.error(error);
			}
		});
};

export const promptDashboard = async (
	vbusy: Vbusy,
	userRepository: UserRepository,
) => {
	clear();

	await getUserTasks(userRepository);

	const choice = await select({
		message: "Command Nav",
		pageSize: 3,
		choices: [
			{ name: "Info", value: "info" },
			{ name: "Cmds", value: "cmds" },
			{ name: "Log Out", value: "logout" },
		],
	});

	switch (choice) {
		case "logout":
			handleLogout(userRepository);
			break;
		case "info":
			figlet.text("vbusy", (error, data) => {
				if (error) {
					console.error(error);
					return;
				}

				console.log(data);
				console.log(
					"An efficient task manager: Your shortcut to 'V'ery easy task management.",
				);
			});
			break;
		case "cmds": {
			console.log("✨ Commands List");

			const table = new Table({
				head: [
					chalk.bgYellow.black(" Name "),
					chalk.bgYellow.black(" Aliases "),
					chalk.bgYellow.black(" Flags"),
					chalk.bgYellow.black(" Description "),
				],
				colWidths: [10, 15, 15, 50],
				chars: {
					top: "",
					"top-mid": "",
					"top-left": "",
					"top-right": "",
					bottom: "",
					"bottom-mid": "",
					"bottom-left": "",
					"bottom-right": "",
					left: "",
					"left-mid": "",
					mid: "",
					"mid-mid": "",
					right: "",
					"right-mid": "",
					middle: " ",
				},
				style: { "padding-left": 0, "padding-right": 0, compact: true },
			});

			for (const cmd of vbusy.commands.values()) {
				table.push([
					`• ${cmd.name}`,
					cmd.aliases.join(", "),
					formatOptions(cmd.options),
					cmd.desc,
				]);
			}

			console.log(table.toString());
			break;
		}
	}
};

export const getUserTasks = async (userRepository: UserRepository) => {
	const token = await keytar.getPassword("tasks", "token");
	const userId = await keytar.getPassword("user", "userId");
	const data = await userRepository.get(token as string, userId as string);

	await data;
};
