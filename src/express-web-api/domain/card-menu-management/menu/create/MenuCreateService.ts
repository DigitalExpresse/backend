import {ERROR_ALREADY_EXIST, ERROR_INVALID_REQUEST} from "@utils/messages/errorMessage";
import {Menu} from "@root/domain/card-menu-management/menu/Menu";
import {MenuRepository} from "@root/domain/card-menu-management/menu/MenuRepository";

export class MenuCreateService {
    static verifyRequestData(requestData) {

            if (requestData.name === undefined && requestData.price === undefined) {
                throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'name' et 'price' sont requis.");
            }

            if (!requestData.name || typeof requestData.name !== "string") {
                console.log(requestData)
                throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'name' est requis et doit être une chaîne de caractères.");
            }

            if (!requestData.price || typeof requestData.price !== "number" || requestData.price <= 0) {
                throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'price' est requis et doit être un nombre supérieur à 0.");
            }

            if (requestData.description && typeof requestData.description !== "string") {
                throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'description' doit être une chaîne de caractères de 100 caractères maximum.");
            }

            if (requestData.description && requestData.description.length > 100) {
                throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'description' doit être une chaîne de caractères de 100 caractères maximum.");
            }
    }

    static async createNewInstanceMenu(requestData) {

        const menu = new Menu(requestData.name, requestData.price, requestData.description);

        return menu;
    }


    static async saveNewMenu(newMenuInstance) {

        try {
            const newMenu = await MenuRepository.create(newMenuInstance);

            return newMenu;

        } catch (e) {
            if (e.code === "P2002") {
                throw new Error(ERROR_ALREADY_EXIST.message + " Ce menu existe déjà.");
            }
            throw new Error(e.message);
        }
    }
}
