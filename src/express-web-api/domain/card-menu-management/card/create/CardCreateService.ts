import {ERROR_ALREADY_EXIST, ERROR_INVALID_REQUEST} from "@utils/messages/error_message";
import {Card} from "@root/domain/card-menu-management/card/Card";
import {CardRepository} from "@root/domain/card-menu-management/card/CardRepository";

export class CardCreateService {

    static verifyRequestData(requestData: any): void {

        if (requestData.id  && typeof requestData.id !== "number" || requestData.id <= 0) {
            throw new Error(ERROR_INVALID_REQUEST.message + "Le champ 'id' doit être un nombre entier positif.");
        }

        if (!requestData.name || typeof requestData.name !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + "Le champ 'name' est requis et doit être une chaîne de caractères.");
        }

        if (requestData.description && typeof requestData.description !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + "Le champ 'description' doit être une chaîne de caractères.");
        }
    }

    static createNewCardInstance (requestData) {

        const newCardInstance = new Card(requestData.id, requestData.name, requestData.description);

        return newCardInstance;
    }

    static async createCard (newCardInstance: Card) {

        try {

            const createdCard = await CardRepository.create({ id: newCardInstance.getId(), name: newCardInstance.getName(), description: newCardInstance.getDescription() });

            return createdCard;
        }

        catch (error) {
            if (error.code === 'P2002') {
                throw new Error(ERROR_ALREADY_EXIST.message + " Le nom de la carte existe déjà");
            }

            throw new Error(error.message);
        }

    }
}