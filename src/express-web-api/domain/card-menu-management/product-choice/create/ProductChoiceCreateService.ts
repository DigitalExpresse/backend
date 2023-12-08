import {
    ProductChoiceCreateRequest
} from "@root/domain/card-menu-management/product-choice/create/ProductChoiceCreateController";
import {ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/errorMessage";
import {ProductChoiceRepository} from "@root/domain/card-menu-management/product-choice/ProductChoiceRepository";

export class ProductChoiceCreateService {

    static verifyRequestData(requestData: ProductChoiceCreateRequest): void {

        if (!requestData.productId || typeof requestData.productId !== 'number') {
            throw new Error(ERROR_INVALID_REQUEST.message + " Product ID must be not empty and a number")
        }

        if (!requestData.choiceName || typeof requestData.choiceName !== 'string') {
            throw new Error(ERROR_INVALID_REQUEST.message + " choiceName must be not empty and a string")
        }

        if (!requestData.listOption || !Array.isArray(requestData.listOption)) {
            throw new Error(ERROR_INVALID_REQUEST.message + " listOption must be not empty and an array")
        }

        for (const option of requestData.listOption) {
            if (typeof option !== 'string') {
                throw new Error(ERROR_INVALID_REQUEST.message + " item of listOption must be string");
            }

            if (option === "") {
                throw new Error(ERROR_INVALID_REQUEST.message + " option item must be a not empty string")
            }
        }
    }


    static async saveChoiceAndOption(requestData: ProductChoiceCreateRequest) {

        try {

            const newChoiceType = await ProductChoiceRepository.createChoiceType(requestData.choiceName)

            const listOption = []

            for (const optionName of requestData.listOption) {
                const newOption = await ProductChoiceRepository.createOption(optionName, newChoiceType.id)
                await ProductChoiceRepository.createOptionProduct(newOption.id, requestData.productId)
                listOption.push(newOption)
            }

            return {
                productId: requestData.productId,
                choiceName: requestData.choiceName,
                listOption: listOption
            }

        } catch (error) {

            if (error.code === "P2002") {
                throw new Error("Choice name already exist")
            }

            if (error.code === "P2003") {
                throw new Error(ERROR_NOT_FOUND.message + " Product id not found")
            }
            console.log(error)
            throw new Error(error)
        }


    }
}