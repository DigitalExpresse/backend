import { ProductSupplementUpdateService } from "@root/domain/card-menu-management/product-supplement/update/ProductSupplementUpdateService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class ProductSupplementUpdateController {
    private readonly _requestData: ProductSupplementUpdateRequestData;
    private _responseDto: ProductSupplementUpdateResponseDto;

    constructor(requestData: ProductSupplementUpdateRequestData) {
        verifyIdFormat(requestData.id)
        ProductSupplementUpdateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async execute(): Promise<ProductSupplementUpdateResponseDto> {
        const updatedProductSupplement = await ProductSupplementUpdateService.updateProductSupplement(this._requestData);

        this._responseDto = {
            id: updatedProductSupplement.id,
            name: updatedProductSupplement.name,
            price: updatedProductSupplement.price,
        };

        return this._responseDto;
    }
}

export type ProductSupplementUpdateRequestData = {
    id: number;
    name?: string;
    price?: number;
};

export type ProductSupplementUpdateResponseDto = {
    id: number;
    name: string;
    price: number;
};
