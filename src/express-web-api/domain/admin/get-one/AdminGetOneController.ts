import {Admin} from "@prisma/client";
import {AdminGetOneService} from "@root/domain/admin/get-one/AdminGetOneService";

export class AdminGetOneController {

    private readonly _requestData: number;

    constructor(requestData: number) {
        this._requestData = requestData;
        AdminGetOneService.verifyRequestData(Number(requestData));
    }

    async getOneController(): Promise<AdminGetOneControllerResponse> {

            const foundedAdmin = await AdminGetOneService.getOneAdmin(this._requestData);

            return foundedAdmin;

    }

}

type AdminGetOneControllerResponse = Omit<Admin, "password">



