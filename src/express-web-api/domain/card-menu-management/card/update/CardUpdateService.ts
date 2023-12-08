import { CardRepository } from '@root/domain/card-menu-management/card/CardRepository';
import {ERROR_ALREADY_EXIST, ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from '@utils/messages/errorMessage';

interface CardUpdateRequestData {
    id: number;
    name?: string;
    description?: string;
}

export class CardUpdateService {
    static async updateCard(requestData: CardUpdateRequestData) {
        console.log(requestData)
        const allowedFields: Array<keyof CardUpdateRequestData> = ['name', 'description'];
        const dataToUpdate = this.returnFieldsNotNull(requestData, allowedFields);
        const updatedCard = await this.updateFieldsNotNull(dataToUpdate, requestData.id);

        return updatedCard;
    }

    private static returnFieldsNotNull<T>(requestData: T, allowedFields: Array<keyof T>): Partial<T> {
        const fieldsNotNull: Partial<T> = {};

        for (const field of allowedFields) {
            if (requestData[field] !== undefined) {
                fieldsNotNull[field] = requestData[field];
            }
        }

        return fieldsNotNull;
    }

    private static async updateFieldsNotNull(dataToUpdate, id: number) {
        try {

            const updatedCard = await CardRepository.update({dataToUpdate, id});
            return updatedCard;

        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error(`${ERROR_ALREADY_EXIST.message} Card name already exists`);
            }

            if (error.code === 'P2025') {
                throw new Error(`${ERROR_NOT_FOUND.message} Card not found`);
            }

            throw new Error(error);
        }
    }

    static verifyRequestData(requestData) {

        const id = Number(requestData.id);

        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error(ERROR_INVALID_REQUEST.message + ' id is not a number');
        }

        if (!requestData.id || requestData.id <= 0) {
            throw new Error (ERROR_INVALID_REQUEST.message + "Le champ 'id' est requis et doit être un nombre entier positif.")
        }

        if (requestData.name && typeof requestData.name !== "string") {
            throw new Error (ERROR_INVALID_REQUEST.message + "Le champ 'name' est requis et doit être une chaîne de caractères.")
        }

        if (requestData.description && typeof requestData.description !== "string") {
            throw new Error (ERROR_INVALID_REQUEST.message + "Le champ 'description' doit être une chaîne de caractères.")
        }
    }
}
