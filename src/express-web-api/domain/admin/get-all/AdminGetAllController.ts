import {Admin} from "@prisma/client";
import {AdminGetAllService} from "@root/domain/admin/get-all/AdminGetAllService";

export class AdminGetAllController {


    async getAllController(): Promise<AdminGetAllControllerResponse> {

        try {

            const allAdmins = await AdminGetAllService.getAllAdmins();

            return allAdmins;

        } catch (error) {
            console.log(error)
            throw new Error(error);
        }


    }



}

type AdminGetAllControllerResponse = Omit<Admin, "password">[]
