import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {
    ProductSupplementDeleteService
} from "@root/domain/card-menu-management/product-supplement/delete/ProductSupplementDeleteService";

export class ProductSupplementDeleteController {

    _supplementId: number;

    constructor(supplementId: number) {
        verifyIdFormat(supplementId);
        this._supplementId = supplementId;
    }

    async execute() {

        await ProductSupplementDeleteService.deleteProductSupplement(this._supplementId);

        return;
    }
}