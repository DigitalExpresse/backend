import {ProductChoiceRepository} from "@root/domain/card-menu-management/product-choice/ProductChoiceRepository";
import {ERROR_INVALID_REQUEST} from "@utils/messages/error_message";

export class OptionChoiceProductUpdateService {

    static verifyRequestData(requestData) {
        if (requestData.name === undefined || requestData.name === "" || typeof requestData.name !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + " name is required and must be a string");
        }
    }

    static async updateOption(optionId: number, name: string) {
        try {
            const updatedOption = await ProductChoiceRepository.updateOption(Number(optionId), name);
            return updatedOption;
        } catch (e) {
            if (e.code === "P2025") {
                throw new Error(ERROR_INVALID_REQUEST.message + " optionId does not exist");
            }
            throw e;
        }
    }
}