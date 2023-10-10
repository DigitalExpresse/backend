import {GetAllProductService} from "@root/domain/card-menu-management/product/getAll/GetAllProductService";

export class ProductGetAllController {

    async execute() {

        return await GetAllProductService.getAllProducts();

    }

}
