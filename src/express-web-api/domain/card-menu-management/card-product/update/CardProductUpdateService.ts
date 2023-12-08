import {CardProductRepository} from "@root/domain/card-menu-management/card-product/CardProductRepository";
import {ERROR_ALREADY_EXIST, ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/errorMessage";
import {
    CardProductUpdateRequestDto
} from "@root/domain/card-menu-management/card-product/update/CardProductUpdateController";

export class CardProductUpdateService {
    static async updateCardProduct(requestData: CardProductUpdateRequestDto) {

        const allowedFields: Array<keyof CardProductUpdateRequestDto> = ["cardId", "productId", "categoryId"];
        const dataToUpdate = this.returnFieldsNotNull(requestData, allowedFields);
        const updatedCardProduct = await this.updateFieldsNotNull(dataToUpdate, requestData.id);

        return updatedCardProduct;
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

    private static async updateFieldsNotNull(dataToUpdate: any, id: number) {

        try {

            const updatedCardProduct = await CardProductRepository.update(Number(id), dataToUpdate);
            return updatedCardProduct;

        } catch (error) {
            if (error.code === "P2003") {
                throw new Error(ERROR_NOT_FOUND.message + " " + error.meta.field_name + " not found");
            }

            if (error.code === "P2002") {
                throw new Error(ERROR_ALREADY_EXIST.message + " Card Product already exists");
            }

            if (error.code === "P2025") {
                throw new Error(ERROR_NOT_FOUND.message + " Card Product not found");
            }

            throw new Error(error);
        }
    }

    static verifyRequestData(requestData: CardProductUpdateRequestDto) {

        if (requestData.cardId && typeof requestData.cardId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Invalid card ID");
        }

        if (requestData.productId && typeof requestData.productId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Invalid product ID");
        }

        if (requestData.categoryId && typeof requestData.categoryId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Invalid category ID");
        }
    }
}