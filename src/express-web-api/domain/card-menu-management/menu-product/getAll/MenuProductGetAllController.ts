import { MenuProductGetAllService } from "@root/domain/card-menu-management/menu-product/getAll/MenuProductGetAllService";
import { ERROR_NOT_FOUND } from "@utils/messages/errorMessage";

export class MenuProductGetAllController {
    async execute() {
        const allMenuProducts = await MenuProductGetAllService.getAllMenuProducts();

        if (allMenuProducts.length === 0) {
            throw new Error("MenuProduct " + ERROR_NOT_FOUND.message);
        }

        return allMenuProducts;
    }
}
