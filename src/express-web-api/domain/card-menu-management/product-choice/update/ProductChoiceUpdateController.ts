import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {
    ProductChoiceUpdateService
} from "@root/domain/card-menu-management/product-choice/update/ProductChoiceUpdateService";

export class ProductChoiceUpdateController {

    _requestData: ProductChoiceUpdateRequest
    _response: ProductChoiceUpdateResponseDto

    constructor(requestData: ProductChoiceUpdateRequest){
        verifyIdFormat(requestData.choiceTypeId)
        ProductChoiceUpdateService.verifyRequestData(requestData)
        this._requestData = requestData
    }

    async execute(): Promise<ProductChoiceUpdateResponseDto> {

        const updatedProductChoice = await ProductChoiceUpdateService.updateChoiceTypeProduct(this._requestData.choiceTypeId, this._requestData.name)

        this._response = {
            choiceTypeId: updatedProductChoice.id,
            name: updatedProductChoice.name
        }

        return this._response;

    }

}

export type ProductChoiceUpdateRequest = {
    choiceTypeId: number;
    name: string;
}

export type ProductChoiceUpdateResponseDto = {
    choiceTypeId: number;
    name: string;
}