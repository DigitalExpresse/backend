import { CardProduct } from "@root/domain/card-menu-management/card-product/CardProduct";
import {ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/error_message";
import { CardProductRepository } from "@root/domain/card-menu-management/card-product/CardProductRepository";
import {
    CardProductCreateRequestData
} from "@root/domain/card-menu-management/card-product/create/CardProductCreateController";

export class CardProductCreateService {
    static verifyRequestData(requestData: CardProductCreateRequestData): void {


        if (!requestData.cardId || !requestData.productId) {
            throw new Error(ERROR_INVALID_REQUEST.message + "product or card id is missing");
        }

        if (!requestData.cardId || typeof requestData.cardId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Card ID must be not null and must be a number");
        }


        if (!requestData.productId || typeof requestData.productId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Product ID must be not null and must be a number");
        }

        if (requestData.categoryId && typeof requestData.categoryId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Category id must be a number");
        }
    }

    static async saveCardProduct(requestData: CardProduct): Promise<CardProduct> {
        try {
            const savedCardProduct = await CardProductRepository.save(requestData);
            return savedCardProduct;
        } catch (error) {
            if (error.code === "P2003") {
                throw new Error(ERROR_NOT_FOUND.message + " " + error.meta.field_name + " not found");
            }
            throw new Error(error);
        }
    }
}