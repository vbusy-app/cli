import { emailRegex } from "./regex.js";

export const isValidEmail = (input: string) => {
    const emailInput = emailRegex.test(input);
    if (!emailInput) return false;

    return emailInput;
}