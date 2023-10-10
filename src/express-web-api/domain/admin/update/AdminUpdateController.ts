import {AdminUpdateService} from "@root/domain/admin/update/AdminUpdateService";

export class AdminUpdateController {

    private readonly _requestData: AdminUpdateControllerRequestBody

    constructor(requestData: AdminUpdateControllerRequestBody) {
        AdminUpdateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async updateController() {

        try {

            const updatedAdmin = await AdminUpdateService.updateAdmin(this._requestData);

            const admin_without_password = {
                firstname: updatedAdmin.firstname,
                lastname: updatedAdmin.lastname,
                email: updatedAdmin.email,
                mobileNumber: updatedAdmin.mobileNumber,
                id: updatedAdmin.id
            }

            return { admin_without_password };

        } catch (error) {
            throw error;
        }
    }

}

type AdminUpdateControllerRequestBody = {
    id: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
}


