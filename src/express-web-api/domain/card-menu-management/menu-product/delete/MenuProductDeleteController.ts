import { MenuProductDeleteService } from "@root/domain/card-menu-management/menu-product/delete/MenuProductDeleteService";
import { ERROR_NOT_FOUND } from "@utils/messages/error_message";

export class MenuProductDeleteController {
    private readonly _menuProductId: number;

    constructor(menuProductId: number) {
        this._menuProductId = menuProductId;
    }

    async execute() {
        const deletedMenuProduct = await MenuProductDeleteService.deleteMenuProduct(this._menuProductId);

        if (!deletedMenuProduct) {
            throw new Error("MenuProduct " + ERROR_NOT_FOUND.message);
        }

        return deletedMenuProduct;
    }
}

