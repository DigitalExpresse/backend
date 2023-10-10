import {ERROR_NOT_FOUND} from "@utils/messages/error_message";
import {CardProductRepository} from "@root/domain/card-menu-management/card-product/CardProductRepository";

export class CardProductGetOneByIdService {
    static verifyRequestData(requestId: string) {
        const id = Number(requestId);

        if (!requestId) {
            throw new Error("L'identifiant du produit de carte est requis.");
        }

        if (typeof id !== "number" || isNaN(id)) {
            throw new Error("L'identifiant du produit de carte n'est pas un nombre valide.");
        }
    }

    static async getOneCardProductById(requestId: string) {
        try {
            const cardProduct = await CardProductRepository.findById(Number(requestId));

            if (!cardProduct) {
                throw new Error(ERROR_NOT_FOUND.message + " Card Product not found");
            }

            return cardProduct;
        } catch (error) {
            throw new Error(error);
        }
    }
}