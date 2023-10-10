import {MenuRepository} from "@root/domain/card-menu-management/menu/MenuRepository";

export class CategoryGetByMenuIdService {

    static async getByMenuId(menuId: number) {

        const menuProducts = await MenuRepository.findByMenuId(menuId);

        return menuProducts;
    }

}