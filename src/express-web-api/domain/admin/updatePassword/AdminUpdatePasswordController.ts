import {AdminUpdatePasswordService} from "@root/domain/admin/updatePassword/AdminUpdatePasswordService";

export class AdminUpdatePasswordController {

    private readonly _requestData;

    constructor(requestData: any) {
        this._requestData = requestData;
    }

    async updatePasswordController() {

        try {

            const updatedPassword = await AdminUpdatePasswordService.updatePassword(this._requestData);

            return updatedPassword

        } catch (error) {
            throw error;
        }
    }

}

