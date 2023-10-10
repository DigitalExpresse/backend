import {CardUpdateService} from "@root/domain/card-menu-management/card/update/CardUpdateService";

export class CardUpdateController {

    _requestData: CardUpdateRequestDto;
    _responseDto: CardUpdateResponseDto;

    constructor(requestData: any) {
        CardUpdateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async updateController(): Promise<CardUpdateResponseDto>{

        const updatedCard = await CardUpdateService.updateCard(this._requestData);

        this._responseDto = {
            id: updatedCard.id,
            name: updatedCard.name,
            description: updatedCard.description,
        };

        return this._responseDto;

    }
}

type CardUpdateResponseDto = {
    id: number;
    name: string;
    description?: string;
}

export type CardUpdateRequestDto = {
    id: number;
    name?: string;
    description?: string;
}