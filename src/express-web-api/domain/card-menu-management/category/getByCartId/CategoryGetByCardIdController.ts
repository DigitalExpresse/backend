import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {
    CategoryGetByCardIdService
} from "@root/domain/card-menu-management/category/getByCartId/CategoryGetByCardIdService";

export class CategoryGetByCardIdController {

    private _cardId: number;

    constructor(cardId: number) {
        verifyIdFormat(cardId)
        this._cardId = cardId;
    }

    async execute() {

        const cardProducts = await CategoryGetByCardIdService.getByCardId(this._cardId);

        return cardProducts;

    }

}