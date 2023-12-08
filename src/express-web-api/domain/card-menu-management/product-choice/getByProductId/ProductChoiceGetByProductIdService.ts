import { ProductChoiceRepository } from "@root/domain/card-menu-management/product-choice/ProductChoiceRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

interface Option {
    optionId: number;
    name: string;
}

interface Supplement {
    id: number;
    name: string;
    price: number;
}

interface ChoiceType {
    id: number;
    name: string;
    optionList: Option[];
}

interface ProductData {
    productId: number;
    name: string;
    price: number;
    description: string;
    choiceTypeList: ChoiceType[];
    supplementList: Supplement[];
}

export class ProductChoiceGetByProductIdService {
    static async getProductAndChoiceAndOptionByProductId(productId) {
        try {

            const foundProductChoiceAndOption = await ProductChoiceRepository.getProductChoiceTypeAndOptionByProductId(
                Number(productId)
            );

            if (!foundProductChoiceAndOption) {
                throw new Error(ERROR_NOT_FOUND.message + " Product not found");
            }

            const transformedData = transformData(foundProductChoiceAndOption);

            return transformedData;
            
        } catch (e) {
            if (e.code === "P2025") {
                throw new Error("productId does not exist");
            }
            throw e;
        }
    }
}

function transformData(foundProductChoiceAndOption) {
    const transformedData: ProductData = {
        productId: foundProductChoiceAndOption.id,
        name: foundProductChoiceAndOption.name,
        price: foundProductChoiceAndOption.price,
        description: foundProductChoiceAndOption.description,
        choiceTypeList: transformChoiceTypeList(foundProductChoiceAndOption.optionProducts),
        supplementList: transformSupplementList(foundProductChoiceAndOption.supplementProducts),
    };

    return transformedData;
}

function transformChoiceTypeList(optionProducts) {
    const choiceTypeMap = new Map<number, ChoiceType>();

    for (const optionProduct of optionProducts) {
        const { optionId, option } = optionProduct;
        const { id } = option.choiceType;

        let choiceType = choiceTypeMap.get(id);

        if (!choiceType) {
            choiceType = {
                id,
                name: option.choiceType.name,
                optionList: [],
            };
            choiceTypeMap.set(id, choiceType);
        }

        choiceType.optionList.push({ optionId, name: option.name });
    }

    const choiceTypeList: ChoiceType[] = Array.from(choiceTypeMap.values());

    return choiceTypeList;
}

function transformSupplementList(supplementProducts) {
    const supplementList: Supplement[] = supplementProducts.map((supplementProduct) => ({
        id: supplementProduct.supplementId,
        name: supplementProduct.supplement.name,
        price: supplementProduct.supplement.price,
    }));

    return supplementList;
}
