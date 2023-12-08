import {CardProductRepository} from "@root/domain/card-menu-management/card-product/CardProductRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class CardProductGetByCardIdService {

    static async getByCardId(cardId: number) {
        try {

            const foundedCardProduct = await CardProductRepository.findByCardId(Number(cardId))
            return foundedCardProduct;

        } catch (e) {
            if (e.code === "P2025") {
                throw new Error("Card Product " + ERROR_NOT_FOUND.message);
            }
            throw new Error(e);
        }
    }

}