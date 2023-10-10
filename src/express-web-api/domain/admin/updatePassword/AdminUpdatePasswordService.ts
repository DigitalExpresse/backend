import bcrypt from "bcryptjs";
import {AdminRepository} from "@root/domain/admin/AdminRepository";

export class AdminUpdatePasswordService {

    static async updatePassword(requestData: any) {

        const {id, password} = requestData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedPassword = AdminRepository.updatePassword({id: id, password: hashedPassword});

        return updatedPassword;
    }
}