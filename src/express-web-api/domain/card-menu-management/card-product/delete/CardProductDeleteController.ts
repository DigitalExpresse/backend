import { ERROR_NOT_FOUND } from "@utils/messages/error_message";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {CardProductDeleteService} from "@root/domain/card-menu-management/card-product/delete/CardProductDeleteService";

export class CardProductDeleteController {
    private readonly _cardProductId: number;

    constructor(menuProductId: number) {
        this._cardProductId = menuProductId;
    }

    async execute() {

        verifyIdFormat(this._cardProductId)
        const deletedCardProduct = await CardProductDeleteService.deleteCardProduct(this._cardProductId);

        if (!deletedCardProduct) {
            throw new Error("CardProduct " + ERROR_NOT_FOUND.message);
        }

        return;
    }
}

