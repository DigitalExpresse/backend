import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {
    ProductChoiceDeleteService
} from "@root/domain/card-menu-management/product-choice/delete/ProductChoiceDeleteService";

export class ProductChoiceDeleteController {

    private readonly _choiceTypeId: number

    constructor(choiceTypeId) {
        verifyIdFormat(choiceTypeId)
        this._choiceTypeId = choiceTypeId
    }

    async execute() {

        await ProductChoiceDeleteService.deleteChoiceTypeProduct(this._choiceTypeId)

        return;

    }

}