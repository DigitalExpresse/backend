import {AdminRepository} from "@root/domain/admin/AdminRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/error_message";

export class AdminGetAllService {
    static async getAllAdmins() {

        const allAdmins = await AdminRepository.findAll();

        if (allAdmins.length === 0) {
            throw new Error("Admin" + ERROR_NOT_FOUND.message);
        }

        return allAdmins;
    }
}