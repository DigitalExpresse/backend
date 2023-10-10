import {verifyIdFormat} from "@utils/service/verifyIdFormat";
import {
    CategoryGetByMenuIdService
} from "@root/domain/card-menu-management/category/getByMenuId/CategoryGetByMenuIdService";

export class CategoryGetByMenuIdController {

    private _menuId: number;

    constructor(menuId: number) {
        verifyIdFormat(menuId)
        this._menuId = menuId;
    }

    async execute() {

        const menuProducts = await CategoryGetByMenuIdService.getByMenuId(this._menuId);

        return menuProducts;

    }

}