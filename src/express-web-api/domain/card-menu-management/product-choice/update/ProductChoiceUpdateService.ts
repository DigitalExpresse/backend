import {ERROR_INVALID_REQUEST} from "@utils/messages/error_message";
import {ProductChoiceRepository} from "@root/domain/card-menu-management/product-choice/ProductChoiceRepository";

export class ProductChoiceUpdateService {

    static verifyRequestData(requestData) {
        if (requestData.name === undefined || requestData.name === "" || typeof requestData.name !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + " name is required and must be a string");
        }
    }

    static async updateChoiceTypeProduct(choiceTypeId: number, name: string) {
        try {
            const updatedProductChoice = await ProductChoiceRepository.updateChoiceTypeProduct(Number(choiceTypeId), name);
            return updatedProductChoice;
        } catch (e) {
            if (e.code === "P2025") {
                throw new Error(ERROR_INVALID_REQUEST.message + " choiceTypeId does not exist");
            }
            throw e;
        }
    }

}