import {ERROR_INVALID_REQUEST} from "@utils/messages/errorMessage";

import {Email, Password} from "@root/domain/shared";
import {Admin} from "@root/domain/admin/Admin";
import {AdminRegistrationRequestData} from "@root/domain/admin/registration/AdminRegistrationController";

export class AdminRegistrationService {

    static verifyRequestData(requestData: AdminRegistrationRequestData): void {

        const {firstname, lastname, email, mobileNumber, password} = requestData;

        if (
            firstname === undefined &&
            lastname === undefined &&
            email === undefined &&
            mobileNumber === undefined &&
            password === undefined
        ) {
            throw new Error(ERROR_INVALID_REQUEST.message + ": no data to create admin");

        } else if (typeof firstname !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + ": firstname must be a non-empty string");

        } else if (lastname !== undefined && typeof lastname !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + ": lastname must be a string");

        } else if (typeof email !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + ": email must be a non-empty string");

        } else if (mobileNumber !== undefined && typeof mobileNumber !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + ": mobileNumber must be a number");

        } else if (typeof password !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + ": password must be a non-empty string");
        }

    }

    static async createAdminInstance(requestData): Promise<Admin> {

        const {firstname, lastname, email, mobileNumber, password} = requestData;

        const emailInstance = new Email(email);
        await emailInstance.verifyIfEmailAlreadyExist();

        const passwordIsValid = Password.isValid(password);
        if (!passwordIsValid) {
            throw new Error(ERROR_INVALID_REQUEST.message + ": password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number");
        }
        const passwordHashed = await Password.hash(password);

        return new Admin(
            firstname,
            lastname,
            emailInstance,
            mobileNumber,
            passwordHashed
        );
    }


}