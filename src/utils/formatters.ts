import moment from "moment";

export const formatDueDate = (date: string) => {
    return moment.utc(date).format("ddd MMM DD");
}