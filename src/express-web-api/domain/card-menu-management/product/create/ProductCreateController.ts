import {ProductCreateService} from "@root/domain/card-menu-management/product/create/ProductCreateService";

export class ProductCreateController {

    _requestData: ProductCreateControllerRequestDto;
    _response: ProductCreateControllerResponseDto;

    constructor(requestData: ProductCreateControllerRequestDto) {
        ProductCreateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async execute() {

       const newProductInstance = await ProductCreateService.createNewInstanceProduct(this._requestData);
       const newProduct = await ProductCreateService.saveNewProduct(newProductInstance);

        this._response = {
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description
        }

        return this._response;

    }

}

type ProductCreateControllerRequestDto = {
    name: string;
    description?: string;
    price: number;
}

type ProductCreateControllerResponseDto = {
    id: number;
    name: string;
    description?: string;
    price: number;
}