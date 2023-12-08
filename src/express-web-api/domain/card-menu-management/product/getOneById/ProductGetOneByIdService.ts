import {ProductRepository} from "@root/domain/card-menu-management/product/ProductRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class ProductGetOneByIdService {

    static async getProductById(id) {
        try {
            const product = await ProductRepository.findById(Number(id));

            if (!product) {
                throw new Error(ERROR_NOT_FOUND.message + "Product not found");
            }

            return product;
        }
        catch (e) {
            if(e.code === "P2025") {
                throw new Error(ERROR_NOT_FOUND.message + "Product not found");
            }
            throw new Error(e.message);
        }
    }

}