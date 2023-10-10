import {CategoryRepository} from "@root/domain/card-menu-management/category/CategoryRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/error_message";

export class CategoryGetByCardIdService {

    static async getByCardId(cardId: number) {

        const cardProducts = await CategoryRepository.findByCardId(cardId);

        return cardProducts;
    }

}