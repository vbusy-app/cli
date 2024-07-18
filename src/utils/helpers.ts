import inquirer from "inquirer";

interface Task {
	task: string;
	_id: string;
}

type Action = "delete" | "view";

export const taskSelection = async (action: Action, tasks: Task[]) => {
	if (!tasks.length) {
		console.log("You don't have any tasks to delete. :~)");
		return;
	}

	const options = tasks.map((task: Task) => ({
		name: task.task,
		value: task._id,
	}));

	const { selectTask } = await inquirer.prompt({
		type: "list",
		name: "selectTask",
		message: `Select a task to ${action}`,
		choices: options,
	});

	return selectTask;
};
