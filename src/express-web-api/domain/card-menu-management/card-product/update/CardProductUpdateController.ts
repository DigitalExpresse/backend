import { CardProductUpdateService } from "@root/domain/card-menu-management/card-product/update/CardProductUpdateService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class CardProductUpdateController {
    private readonly _requestData: CardProductUpdateRequestDto;
    private _responseDto: CardProductUpdateResponseDto;

    constructor(requestData: any) {
        CardProductUpdateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async execute(): Promise<CardProductUpdateResponseDto> {
        verifyIdFormat(this._requestData.id);
        const updatedCardProduct = await CardProductUpdateService.updateCardProduct(this._requestData);

        this._responseDto = {
            id: updatedCardProduct.id,
            cardId: updatedCardProduct.cardId,
            productId: updatedCardProduct.productId,
            categoryId: updatedCardProduct.categoryId,
        };

        return this._responseDto;
    }
}

type CardProductUpdateResponseDto = {
    id: number;
    cardId: number;
    productId: number;
    categoryId: number;
};

export type CardProductUpdateRequestDto = {
    id: number;
    cardId?: number;
    productId?: number;
    categoryId?: number;
};
