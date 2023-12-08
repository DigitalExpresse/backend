import {MenuRepository} from "@root/domain/card-menu-management/menu/MenuRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class MenuGetOneByIdService {

    static verifyRequestData(requestId: string) {

        const id = Number(requestId);

        if (!requestId) {
            throw new Error("L'identifiant du menu est requis.");
        }

        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error('id is not a number');
        }
    }

    static async getOneById(requestId: string) {

                const menu = await MenuRepository.findById(Number(requestId));

                if (!menu) {
                    throw new Error(ERROR_NOT_FOUND.message + ' Menu not found');
                }

                return menu;

    }
}