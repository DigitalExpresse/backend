import {CardRepository} from "@root/domain/card-menu-management/card/CardRepository";

export class CardGetAllController {

    async getAllController() {

        try {

            const allCards = await CardRepository.findAll();
            return allCards;

        } catch (e) {
            throw new Error(e);
        }
    }

}