import {MenuProductRepository} from "@root/domain/card-menu-management/menu-product/MenuProductRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/error_message";

export class MenuProductDeleteService {
    static async deleteMenuProduct(menuProductId: number) {
        try {
            const deletedMenuProduct = await MenuProductRepository.delete(Number(menuProductId));
            return deletedMenuProduct;
        } catch (error) {
            if (error.code === "P2025") {
                throw new Error("MenuProduct " + ERROR_NOT_FOUND.message);
            }
            throw new Error(error);
        }
    }
}