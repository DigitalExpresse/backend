import {ERROR_NOT_FOUND} from "@utils/messages/error_message";
import {MenuRepository} from "@root/domain/card-menu-management/menu/MenuRepository";

export class MenuGetAllController {

    public async getAllController() {

        const allMenus = await MenuRepository.findAll();

        if (allMenus.length === 0) {
            throw new Error('Menu ' + ERROR_NOT_FOUND.message );
        }

        return allMenus;

    }
}