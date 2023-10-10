import {ERROR_INVALID_REQUEST} from "@utils/messages/error_message";

export class CardGetOneByIdService {

    static verifyRequestData(requestId: string) {
        const id = Number(requestId);

        if (!requestId) {
            throw new Error("L'identifiant de la card est requis.");
        }

        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error(ERROR_INVALID_REQUEST.message + ' id is not a number');
        }
    }

}