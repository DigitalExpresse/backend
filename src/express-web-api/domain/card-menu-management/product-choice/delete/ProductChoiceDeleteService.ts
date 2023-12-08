import {ProductChoiceRepository} from "@root/domain/card-menu-management/product-choice/ProductChoiceRepository";
import {ERROR_INVALID_REQUEST} from "@utils/messages/errorMessage";

export class ProductChoiceDeleteService {

    static async deleteChoiceTypeProduct(choiceTypeId) {

        try {

            await ProductChoiceRepository.deleteChoiceType(Number(choiceTypeId))

        } catch (e) {

            if (e.code == "P2025") {
                throw new Error(ERROR_INVALID_REQUEST.message + " choiceType not found")
            }
            throw new Error(e)
        }
    }
}