import {MenuRepository} from "@root/domain/card-menu-management/menu/MenuRepository";
import {ERROR_ALREADY_EXIST, ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class MenuUpdateService {

    static async updateMenu(requestData: any) {

        const allowedFields = ['name', 'price', 'description'];
        const dataToUpdate = MenuUpdateService.returnFieldsNotNull(requestData, allowedFields);
        const updatedMenu = await MenuUpdateService.updateFieldsNotNull(dataToUpdate, requestData.id);

        return updatedMenu;
    }

    static returnFieldsNotNull(requestData: any, allowedFields: string[]): any {

        const fieldsNotNull: any = {};

        for (const field of allowedFields) {
            if (requestData[field] !== undefined) {
                fieldsNotNull[field] = requestData[field];
            }
        }

        return fieldsNotNull;
    }


    static async  updateFieldsNotNull(dataToUpdate: any, id: number) {

        try {

            const updatedMenu = await MenuRepository.update({dataToUpdate, id});

            return updatedMenu;

        } catch (error) {

            if (error.code === 'P2002') {
                throw new Error(ERROR_ALREADY_EXIST.message + ' Menu name already exist');
            }

            if (error.code === 'P2025') {
                throw new Error(ERROR_NOT_FOUND.message + ' Menu not found');
            }

            throw new Error(error);
        }
    }

        static verifyRequestData(requestData): void {

            const id = Number(requestData.id);

            if (typeof id !== 'number' || isNaN(id)) {
                throw new Error(ERROR_INVALID_REQUEST.message + ' id is not a number');
            }

            else if (!requestData.id || typeof requestData.id !== "string") {
                throw new Error(ERROR_INVALID_REQUEST.message + " id is undefined");
            }

            else if (requestData.name && typeof requestData.name !== "string") {
                throw new Error(ERROR_INVALID_REQUEST.message + " name is not a string");
            }

            else if (requestData.price && (typeof requestData.price !== "number" || requestData.price <= 0)) {
                throw new Error(ERROR_INVALID_REQUEST.message + " price is not a number or is less than 0");
            }

            else if (requestData.description && typeof requestData.description !== "string") {
                throw new Error(ERROR_INVALID_REQUEST.message + " description is not a string");
            }
        }

}