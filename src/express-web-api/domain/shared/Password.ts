import {ERROR_INVALID_PASSWORD} from "@utils/messages/error_message";
import bcrypt from "bcryptjs";

export class Password {

    private readonly _value: string;

    constructor(password: string) {
        if (Password.isValid(password)) {
            throw new Error(ERROR_INVALID_PASSWORD.message);
        }

        this._value = password;

    }

    static isValid(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    static hash(password: string) {
        try {

            const hashedPassword = bcrypt.hash(password, 10);
            return hashedPassword;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async compare(password: string, hashedPassword: string): Promise<boolean> {
        try {
            const isPasswordValid = await bcrypt.compare(password, hashedPassword);
            return isPasswordValid;


        } catch (error) {
            throw new Error(error.message);
        }
    }

    getValue() {
        return this._value;
    }
}
