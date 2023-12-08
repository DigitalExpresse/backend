import { CategoryRepository } from "@root/domain/card-menu-management/category/CategoryRepository";
import { ERROR_INVALID_REQUEST, ERROR_NOT_FOUND } from "@utils/messages/errorMessage";

export class CategoryUpdateService {

    static async updateCategory(requestData: any) {
        CategoryUpdateService.verifyRequestData(requestData);

        const allowedFields = ['name'];
        const dataToUpdate = CategoryUpdateService.returnFieldsNotNull(requestData, allowedFields);
        const updatedCategory = await CategoryUpdateService.updateFieldsNotNull(dataToUpdate, requestData.id);

        return updatedCategory;
    }

    static verifyRequestData(requestData: any): void {

        if (requestData.name && typeof requestData.name !== 'string') {
            throw new Error(ERROR_INVALID_REQUEST.message + ' name must be a string');
        }
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

    static async updateFieldsNotNull(dataToUpdate: any, id: number) {
        try {
            const updatedCategory = await CategoryRepository.update(id, dataToUpdate );
            return updatedCategory;
        } catch (error) {

            if (error.code === 'P2025') {
                throw new Error(ERROR_NOT_FOUND.message + ' Category not found');
            }

            throw new Error(error);
        }
    }
}
