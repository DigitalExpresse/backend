import {CardProductRepository} from "@root/domain/card-menu-management/card-product/CardProductRepository";

export class CardProductGetAllService {
    static async getAllCardProducts() {
        try {
            const allCardProducts = await CardProductRepository.findAll();
            return allCardProducts;
        } catch (error) {
            throw new Error(error);
        }
    }
}