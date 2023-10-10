import {CardProduct} from "@prisma/client";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {
    CardProductGetByCardIdService
} from "@root/domain/card-menu-management/card-product/getByCardId/CardProductGetByCardIdService";

export class CardProductGetByCardIdController {

    private readonly _cardId: number;
    private _response: GetByCardIdResponse;

    constructor(cardId: number) {
        verifyIdFormat(cardId);
        this._cardId = cardId
    }

    async execute() {

        const foundedCardProduct = await CardProductGetByCardIdService.getByCardId(this._cardId)

        this._response = foundedCardProduct;

        return this._response;

    }

}

export type GetByCardIdResponse = CardProduct[];