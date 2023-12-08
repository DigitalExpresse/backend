import {ERROR_ALREADY_EXIST, ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/errorMessage";
import {ProductRepository} from "@root/domain/card-menu-management/product/ProductRepository";

export class ProductUpdateService {

    static verifyRequestData(requestData) {

        if (!requestData.id || typeof requestData.id !== "string") {
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

    static async updateProduct(requestData: any) {

        const allowedFields = ['name', 'price', 'description'];
        const dataToUpdate = ProductUpdateService.returnFieldsNotNull(requestData, allowedFields);
        const updatedProduct = await ProductUpdateService.updateFieldsNotNull(dataToUpdate, requestData.id);

        return updatedProduct;
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

        const idNumber = Number(id);

        try {

            const updatedProduct = await ProductRepository.update(idNumber, dataToUpdate);

            return updatedProduct;

        } catch (error) {

            if (error.code === 'P2002') {
                throw new Error(ERROR_ALREADY_EXIST.message + ' Product name already exist');
            }

            if (error.code === 'P2025') {
                throw new Error(ERROR_NOT_FOUND.message + ' Product not found');
            }

            throw new Error(error);
        }
    }
}