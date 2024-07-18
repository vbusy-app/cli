import keytar from "keytar";

export const deleteAllData = async (): Promise<void> => {
	try {
		const keys = [
			{ service: "vbusy", account: "token" },
			{ service: "vbusy", account: "userId" },
			{ service: "tasks", account: "token" },
			{ service: "user", account: "userId" },
		];

		for (const key of keys) {
			await keytar.deletePassword(key.service, key.account);
			console.log(`Deleted keytar entry for: ${key.service}`);
		}

		console.log("All stored data deleted from keytar.");
	} catch (error) {
		console.error("Error deleting stored data:", error);
	}
};
