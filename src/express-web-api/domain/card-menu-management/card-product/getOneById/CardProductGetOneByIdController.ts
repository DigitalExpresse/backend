import { CardProductGetOneByIdService } from "@root/domain/card-menu-management/card-product/getOneById/CardProductGetOneByIdService";

export class CardProductGetOneByIdController {
    private readonly _requestId: string;

    constructor(requestId: string) {
        CardProductGetOneByIdService.verifyRequestData(requestId);
        this._requestId = requestId;
    }

    async execute() {
        try {
            const cardProduct = await CardProductGetOneByIdService.getOneCardProductById(this._requestId);
            return cardProduct;
        } catch (error) {
            throw new Error(error);
        }
    }
}
