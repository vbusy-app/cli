import moment from "moment";

export const formatDueDate = (date: string) => {
    return moment.utc(date).format("ddd MMM DD");
}

export const formatOptions = (options: any) => {
    if (!Object.keys(options).length) {
        return "";
    }

    return Object.keys(options).map(key => `-${options[key].alias}, --${key}`).join("\n");
};