import {CardRepository} from "@root/domain/card-menu-management/card/CardRepository";
import {ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class CardDeleteService {

    static verifyRequestData(requestId: string) {
        const id = Number(requestId);

        if (!requestId) {
            throw new Error("L'identifiant du menu est requis.");
        }

        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error(ERROR_INVALID_REQUEST.message + ' id is not a number');
        }
    }

    static async deleteCard(requestId: string) {

        try {

            await CardRepository.delete(Number(requestId));

        } catch (e) {

            if (e.code === "P2025") {
                throw new Error(ERROR_NOT_FOUND.message + " Card not found");
            }

            throw new Error(e);
        }
    }
}