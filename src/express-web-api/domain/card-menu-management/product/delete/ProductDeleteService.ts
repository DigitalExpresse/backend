import {ProductRepository} from "@root/domain/card-menu-management/product/ProductRepository";

export class ProductDeleteService {

    static async deleteProduct(id) {
        try {
            await ProductRepository.delete(Number(id));
            return;
        } catch (e) {

            if (e.code === "P2025") throw new Error("Product not found");

            throw new Error(e.message);
        }
    }

}