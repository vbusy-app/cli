import clear from "clear";
import figlet from "figlet";
import Table from "cli-table";
import keytar from "keytar";
import { select } from "@inquirer/prompts";
import inquirer from "inquirer";
import type { UserService } from "../services/user.js";
import { isValidEmail } from "./validators.js";

export const isAuthenticated = async (): Promise<boolean> => {
    const token = await keytar.getPassword("tasks", "token");
    return !!token;
};

export const handleLogin = async (userService: UserService): Promise<void> => {
    const token = await keytar.getPassword("tasks", "token");
    const userId = await keytar.getPassword("user", "userId");

    const data = await userService.get(token as string, userId as string);

    console.log(`🌱 Logged in as ${data.username}`);
};

export const handleLogout = async (userService: UserService): Promise<void> => {
    console.log("Logging out... Cya! 🐝");

    try {
        await userService.logout();
        await keytar.deletePassword("tasks", "token");
        await keytar.deletePassword("user", "userId");
    } catch (error) {
        console.error("Error during logout:", error);
    }

    process.exit();
};

export const promptLogin = (userService: UserService) => {
    inquirer.prompt([
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
            }
        },
        {
            type: "password",
            name: "password",
            message: "Enter your password:",
            mask: "•"
        },
    ]).then(async ({ email, password }) => {
        try {
            const response = await userService.login(email, password);
            if (response?._id && response.token) {
                const userId = response._id;
                const token = response.token;

                await keytar.setPassword("user", "userId", userId);
                await keytar.setPassword("tasks", "token", token);

                handleLogin(userService);
                promptDashboard(userService);
            }
        } catch (error) {
            console.error(error);
        }
    });
};

export const promptDashboard = async (userService: UserService) => {
    clear();

    await getUserTasks(userService);

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
            handleLogout(userService);
            break;
        case "info":
            figlet.text("vbusy", (error, data) => {
                if (error) {
                    console.error(error);
                    return;
                }

                console.log(data);
                console.log("An efficient task manager: Your shortcut to 'V'ery easy task management.");
            });
            break;
        case "cmds": {
            console.log("✨ Commands List");

            const commands = await keytar.getPassword("cmdsList", "cmds");
            const cmds = JSON.parse(commands as string);

            const table = new Table({
                head: ["Name", "Description"],
                colWidths: [20, 50],
                chars: {
                    "top": "", "top-mid": "", "top-left": "", "top-right": "",
                    "bottom": "", "bottom-mid": "", "bottom-left": "", "bottom-right": "",
                    "left": "", "left-mid": "", "mid": "", "mid-mid": "",
                    "right": "", "right-mid": "", "middle": " ",
                },
                style: { "padding-left": 0, "padding-right": 0, "compact": true },
            });

            for (const cmd of cmds) {
                table.push([`• ${cmd.name}`, cmd.desc]);
            }

            console.log(table.toString());
            break;
        }
    }
};

export const getUserTasks = async (userService: UserService) => {
    const token = await keytar.getPassword("tasks", "token");
    const userId = await keytar.getPassword("user", "userId");
    const data = await userService.get(token as string, userId as string);

    await data;
}