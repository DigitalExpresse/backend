import {
    ProductChoiceCreateService
} from "@root/domain/card-menu-management/product-choice/create/ProductChoiceCreateService";

export class ProductChoiceCreateController {

    _requestData: ProductChoiceCreateRequest
    _response: ProductChoiceCreateResponseDto

    constructor(requestData: ProductChoiceCreateRequest) {
        ProductChoiceCreateService.verifyRequestData(requestData)
        this._requestData = requestData
    }

    async execute() {

        this._response = await ProductChoiceCreateService.saveChoiceAndOption(this._requestData)

        return this._response

    }
}

export type ProductChoiceCreateRequest = {
    productId: number;
    choiceName: string;
    listOption: string[]
}

export type ProductChoiceCreateResponseDto = {
    productId: number;
    choiceName: string;
    listOption: string[]
}