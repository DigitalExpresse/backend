import {MenuDeleteService} from "@root/domain/card-menu-management/menu/delete/MenuDeleteService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class MenuDeleteController {
    private readonly _requestId: string;

    constructor(requestId: string) {
        MenuDeleteService.verifyRequestData(requestId);
        this._requestId = requestId;
    }

    async deleteController() {

        try {

            verifyIdFormat(this._requestId);
            await MenuDeleteService.deleteMenu(this._requestId);

        } catch (error) {

            throw new Error(error);

        }

    }

}