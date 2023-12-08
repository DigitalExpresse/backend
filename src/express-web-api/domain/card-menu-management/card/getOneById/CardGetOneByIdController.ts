import {CardGetOneByIdService} from "@root/domain/card-menu-management/card/getOneById/CardGetOneByIdService";
import {CardRepository} from "@root/domain/card-menu-management/card/CardRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class CardGetOneByIdController {

    _requestId: string;

    constructor(requestId: string) {
        CardGetOneByIdService.verifyRequestData(requestId);
        this._requestId = requestId;
    }

    async getOneByIdController() {
        try {
            const foundedCard = await CardRepository.findById(Number(this._requestId));
            if (!foundedCard) {
                throw new Error(ERROR_NOT_FOUND.message + ' Card not found');
            }

            return foundedCard;

        } catch (e) {
            throw new Error(e);
        }
    }

}