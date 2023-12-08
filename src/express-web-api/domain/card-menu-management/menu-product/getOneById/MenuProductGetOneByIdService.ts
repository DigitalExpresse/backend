import {MenuProductRepository} from "@root/domain/card-menu-management/menu-product/MenuProductRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class MenuProductGetOneByIdService {

    static async getOneById(requestId: string) {
        const menuProduct = await MenuProductRepository.findById(Number(requestId));

        if (!menuProduct) {
            throw new Error(ERROR_NOT_FOUND.message + " MenuProduct not found");
        }

        return menuProduct;
    }
}