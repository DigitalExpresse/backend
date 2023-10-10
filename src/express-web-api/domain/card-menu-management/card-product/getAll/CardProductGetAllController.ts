import { CardProductGetAllService } from "@root/domain/card-menu-management/card-product/getAll/CardProductGetAllService";
import { ERROR_NOT_FOUND } from "@utils/messages/error_message";

export class CardProductGetAllController {
    async execute() {
        const allCardProducts = await CardProductGetAllService.getAllCardProducts();

        if (allCardProducts.length === 0) {
            throw new Error("Card Product " + ERROR_NOT_FOUND.message);
        }

        return allCardProducts;
    }
}
