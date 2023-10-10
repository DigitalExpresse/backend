import {CardDeleteService} from "@root/domain/card-menu-management/card/delete/CardDeleteService";

export class CardDeleteController {

    _requestId: string;

    constructor(requestId: string) {
        CardDeleteService.verifyRequestData(requestId);
        this._requestId = requestId;
    }

    async deleteController() {
        await CardDeleteService.deleteCard(this._requestId);
    }

}