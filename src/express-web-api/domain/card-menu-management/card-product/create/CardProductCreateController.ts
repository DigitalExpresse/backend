import { CardProduct } from "@root/domain/card-menu-management/card-product/CardProduct";
import {CardProductCreateService} from "@root/domain/card-menu-management/card-product/create/CardProductCreateService";

export class CardProductCreateController {
    private readonly _requestData: CardProductCreateRequestData;
    private _responseDto: CardProductCreateResponseDto;

    constructor(requestData: CardProductCreateRequestData) {
        CardProductCreateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async execute(): Promise<CardProductCreateResponseDto> {

        const newCardProductInstance = new CardProduct(
            this._requestData.cardId,
            this._requestData.productId,
            this._requestData.categoryId
        );

        const savedCardProduct = await CardProductCreateService.saveCardProduct(newCardProductInstance);

        this._responseDto = {
            id: savedCardProduct.id,
            cardId: savedCardProduct.cardId,
            productId: savedCardProduct.productId,
            categoryId: savedCardProduct.categoryId,
        };

        return this._responseDto;
    }
}

export type CardProductCreateRequestData = {
    cardId: number;
    productId: number;
    categoryId: number;
};

export type CardProductCreateResponseDto = {
    id: number;
    cardId: number;
    productId: number;
    categoryId: number;
};