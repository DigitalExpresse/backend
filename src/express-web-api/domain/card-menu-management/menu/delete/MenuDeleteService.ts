import {ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/errorMessage";
import {MenuRepository} from "@root/domain/card-menu-management/menu/MenuRepository";

export class MenuDeleteService {

    static verifyRequestData(requestId: string) {

        const id = Number(requestId);

        if (!requestId) {
            throw new Error("L'identifiant du menu est requis.");
        }

        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error(ERROR_INVALID_REQUEST.message + ' id is not a number');
        }
    }

    static async deleteMenu(requestId: string) {
            try {

                const deletedMenu = await MenuRepository.delete(Number(requestId));

                return deletedMenu;

            } catch (error) {

                if (error.code === 'P2025') {
                    throw new Error(ERROR_NOT_FOUND.message + ' Menu not found');
                }
                throw new Error(error);
            }
    }
}