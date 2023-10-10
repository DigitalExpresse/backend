import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {
    ProductChoiceGetByProductIdService
} from "@root/domain/card-menu-management/product-choice/getByProductId/ProductChoiceGetByProductIdService";
import {ChoiceType, Supplement} from "@prisma/client";

export class ProductChoiceGetByProductIdController {

    _productId: number
    _response: ProductChoiceGetByProductIdResponseDto

    constructor(productId: number) {
        verifyIdFormat(productId)
        this._productId = productId
    }

    async execute() {

        const foundProductChoiceAndOption = await ProductChoiceGetByProductIdService.getProductAndChoiceAndOptionByProductId(this._productId)

        this._response = foundProductChoiceAndOption

        return this._response
    }

}

export type ProductChoiceGetByProductIdResponseDto = {
    productId: number;
    name: string;
    price: number;
    description: string;
    choiceTypeList: ChoiceType[];
    supplementList: Supplement[];

}