import {ProductGetOneByIdService} from "@root/domain/card-menu-management/product/getOneById/ProductGetOneByIdService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";
export class ProductGetOneByIdController {

    private readonly id : string;
    private response : ProductGetOneByIdResponseDto;

    constructor(id : string) {
        verifyIdFormat(id);
        this.id = id;
    }

    async execute() {

        const foundedProduct = await ProductGetOneByIdService.getProductById(this.id);
        this.response = foundedProduct

        return this.response;

    }

}

type ProductGetOneByIdResponseDto = {
    id: number;
    name: string;
    description?: string;
    price: number;
}