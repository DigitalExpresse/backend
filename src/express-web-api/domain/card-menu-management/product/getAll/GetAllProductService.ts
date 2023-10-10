import {ProductRepository} from "@root/domain/card-menu-management/product/ProductRepository";

export class GetAllProductService {

    static async getAllProducts() {
        try {
            const allProducts = await ProductRepository.findAll();
            return allProducts;
        }
        catch (e) {
            throw new Error(e.message);
        }

    }
}