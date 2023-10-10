import {
    ProductSupplementCreateService
} from "@root/domain/card-menu-management/product-supplement/create/ProductSupplementCreateService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class ProductSupplementCreateController {

    _requestData: ProductSupplementCreateRequestData;
    _response: ProductSupplementCreateResponseDto;

    constructor(requestData: ProductSupplementCreateRequestData) {
        ProductSupplementCreateService.verifyRequestData(requestData.productId, requestData.name, requestData.price);
        this._requestData = requestData;
    }

    async execute() {
        verifyIdFormat(this._requestData.productId)
        const newProductSupplement = await ProductSupplementCreateService.createNewProductSupplement(this._requestData.productId, this._requestData.name, this._requestData.price);

        this._response = {
            productSupplementId: newProductSupplement.newProductSupplement.id,
            productId: newProductSupplement.newProductSupplement.productId,
            supplementId: newProductSupplement.newSupplement.id,
            name: newProductSupplement.newSupplement.name,
            price: newProductSupplement.newSupplement.price,
        }

        return this._response;
    }
}

export type ProductSupplementCreateRequestData = {
    productId: number;
    name: string;
    price: number;
}

export type ProductSupplementCreateResponseDto = {
    productSupplementId: number;
    productId: number;
    supplementId: number;
    name: string;
    price: number;
}