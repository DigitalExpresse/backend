import {AdminRepository} from "@root/domain/admin/AdminRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class AdminGetOneService {
    static async getOneAdmin(id) {
        try {

            const foundedAdmin = await AdminRepository.findById(Number(id));

            if (!foundedAdmin) {
                throw new Error("Admin : " + ERROR_NOT_FOUND.message);
            }

            return foundedAdmin;

        } catch (error) {
            throw error;
        }

    }

    static verifyRequestData(requestData) {
        if (!requestData) {
            throw new Error("Request data is empty");
        }

        if (typeof requestData !== "number") {
            throw new Error("Request data is not a number");
        }
    }
}