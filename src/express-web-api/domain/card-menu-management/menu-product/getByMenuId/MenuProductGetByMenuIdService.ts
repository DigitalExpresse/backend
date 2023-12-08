import { MenuProductRepository } from "@root/domain/card-menu-management/menu-product/MenuProductRepository";
import { ERROR_NOT_FOUND } from "@utils/messages/errorMessage";

export class MenuProductGetByMenuIdService {
    static async getByMenuId(cardId: number) {

        try {
            const foundedMenuProducts = await MenuProductRepository.findByMenuId(Number(cardId));
            return foundedMenuProducts;
        } catch (e) {
            if (e.code === "P2025") {
                throw new Error("Menu Product " + ERROR_NOT_FOUND.message);
            }
            throw new Error(e);
        }
    }

}