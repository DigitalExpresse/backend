import {CardCreateService} from "@root/domain/card-menu-management/card/create/CardCreateService";

export class CardCreateController {
    _requestData: CardCreateRequestDto;
    _responseDto: CardCreateResponseDto;

    constructor(requestData: any) {
        CardCreateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async createController(): Promise<CardCreateResponseDto>{

        const newCardInstance = CardCreateService.createNewCardInstance(this._requestData);
        const createdCard = await CardCreateService.createCard(newCardInstance);

        this._responseDto = {
            id: createdCard.id,
            name: createdCard.name,
            description: createdCard.description,
        };

        return this._responseDto;

    }

}

type CardCreateResponseDto = {
    id: number;
    name: string;
    description?: string;
}

export type CardCreateRequestDto = {
    name: string;
    description?: string;
}