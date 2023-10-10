import {CardProductRepository} from "@root/domain/card-menu-management/card-product/CardProductRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/error_message";

export class CardProductDeleteService {
    static async deleteCardProduct(cardProductId: number) {
        try {
            const deleteCardProduct = await CardProductRepository.delete(Number(cardProductId));
            return deleteCardProduct;
        } catch (error) {
            if (error.code === "P2025") {
                throw new Error("CardProduct " + ERROR_NOT_FOUND.message);
            }
            throw new Error(error);
        }
    }
}