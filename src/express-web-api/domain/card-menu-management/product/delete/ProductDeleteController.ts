import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {ProductDeleteService} from "@root/domain/card-menu-management/product/delete/ProductDeleteService";

export class ProductDeleteController {

    private readonly id : string;

    constructor(id : string) {
        verifyIdFormat(id)
        this.id = id;
    }

    async execute() {
        await ProductDeleteService.deleteProduct(this.id);
    }

}