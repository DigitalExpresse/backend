import {AdminRepository} from "@root/domain/admin/AdminRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/error_message";

export class AdminDeleteAccountController {

    private readonly _requestDataId: number;

    constructor(_requestDataId) {

            this._requestDataId = _requestDataId;
    }

    async deleteAccountController() {

        try {

            return await AdminRepository.delete(Number(this._requestDataId));

        } catch (error) {

            if (Number.isNaN(Number(this._requestDataId))) {
                throw new Error('id must be a number');
            }

            if(error.code === 'P2025') {
                throw new Error('Admin ' + ERROR_NOT_FOUND.message);
            }

            throw new Error(error);

        }
    }
}