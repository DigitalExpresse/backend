import {ProductUpdateService} from "@root/domain/card-menu-management/product/update/ProductUpdateService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class ProductUpdateController {

    private readonly requestData : ProductUpdateRequestDto;
    private response : ProductUpdateResponseDto;

    constructor(requestData : ProductUpdateRequestDto) {
        verifyIdFormat(requestData.id)
        ProductUpdateService.verifyRequestData(requestData);
        this.requestData = requestData;
    }

    async execute() {

        const updatedProduct = await ProductUpdateService.updateProduct(this.requestData);

        this.response = { id: updatedProduct.id, name: updatedProduct.name, description: updatedProduct.description, price: updatedProduct.price }

        return this.response;
    }

}

type ProductUpdateRequestDto = {
    id: number;
    name?: string;
    description?: string;
    price?: number;
}

type ProductUpdateResponseDto = {
    id: number;
    name: string;
    description: string;
    price: number;
}