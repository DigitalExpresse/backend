import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {
    ProductSupplementGetByProductIdService
} from "@root/domain/card-menu-management/product-supplement/getByProductId/ProductSupplementGetByProductIdService";

export class ProductSupplementGetByProductIdController {

    _productId: number;
    _response: any

    constructor(productId: number) {
        verifyIdFormat(productId);
        this._productId = productId;
    }

    async execute() {
        const foundProductSupplements = await ProductSupplementGetByProductIdService.getByProductId(this._productId);
        this._response = foundProductSupplements;
    }
}

