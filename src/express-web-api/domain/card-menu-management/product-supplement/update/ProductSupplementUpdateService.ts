import { ProductSupplementRepository } from "@root/domain/card-menu-management/product-supplement/ProductSupplementRepository";
import { ERROR_ALREADY_EXIST, ERROR_INVALID_REQUEST, ERROR_NOT_FOUND } from "@utils/messages/errorMessage";

export class ProductSupplementUpdateService {
    static async updateProductSupplement(requestData: any) {
        ProductSupplementUpdateService.verifyRequestData(requestData);

        const allowedFields = ["name", "price"];
        const dataToUpdate = ProductSupplementUpdateService.returnFieldsNotNull(requestData, allowedFields);
        const updatedProductSupplement = await ProductSupplementUpdateService.updateFieldsNotNull(dataToUpdate, requestData.id);

        return updatedProductSupplement;
    }

    static verifyRequestData(requestData: any): void {

        // on vérifie si la requete contient au moins un des champs suivants : name, price
        if (!requestData.name && !requestData.price) {
            throw new Error(ERROR_INVALID_REQUEST.message + " Must contain at least one of the following fields: name, price");
        }

        if (requestData.name && typeof requestData.name !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Name must be a string");
        }

        if (requestData.price && (typeof requestData.price !== "number" || requestData.price <= 0)) {
            throw new Error(ERROR_INVALID_REQUEST.message + " Price must be a number greater than 0");
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
            const updatedProductSupplement = await ProductSupplementRepository.update(id, dataToUpdate);
            return updatedProductSupplement;
        } catch (error) {
            if (error.code === "P2002") {
                throw new Error(ERROR_ALREADY_EXIST.message + " Product supplement name already exists");
            }

            if (error.code === "P2025") {
                throw new Error(ERROR_NOT_FOUND.message + " Product supplement not found");
            }

            throw new Error(error);
        }
    }
}
