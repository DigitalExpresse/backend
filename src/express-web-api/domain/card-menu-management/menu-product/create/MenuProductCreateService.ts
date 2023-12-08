import {MenuProduct} from "@root/domain/card-menu-management/menu-product/MenuProduct";
import {ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/errorMessage";
import {MenuProductRepository} from "@root/domain/card-menu-management/menu-product/MenuProductRepository";

export class MenuProductCreateService {

    static verifyRequestData(requestData): void {

        if (!requestData.menuId || !requestData.productId || !requestData.categoryId) {
            throw new Error(ERROR_INVALID_REQUEST.message + " category, menu or product id is missing");
        }

        if (typeof requestData.menuId !== "number" || typeof requestData.productId !== "number" || typeof requestData.categoryId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Invalid data type");
        }
    }

    static async saveMenuProduct(requestData): Promise<MenuProduct>{

        try {
            const newMenuProductInstance = new MenuProduct(requestData.menuId ,requestData.productId, requestData.categoryId, requestData.premium);

            const savedMenuProduct = await MenuProductRepository.save(newMenuProductInstance);

            return savedMenuProduct;

        } catch (e) {
            if (e.code === "P2003") {
                throw new Error(ERROR_NOT_FOUND.message + " " + e.meta.field_name + " not found");
            }
            throw new Error(e);
        }


    }





}