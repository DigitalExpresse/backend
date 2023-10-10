import {MenuProductRepository} from "@root/domain/card-menu-management/menu-product/MenuProductRepository";

export class MenuProductGetAllService {
    static async getAllMenuProducts() {
        try {
            const allMenuProducts = await MenuProductRepository.findAll();
            return allMenuProducts;
        } catch (error) {
            throw new Error(error);
        }
    }
}