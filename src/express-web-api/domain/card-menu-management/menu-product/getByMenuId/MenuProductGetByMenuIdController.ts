import { MenuProduct } from "@prisma/client";
import { verifyIdFormat } from "@utils/service/verifyIdFormat";
import { MenuProductGetByMenuIdService } from "@root/domain/card-menu-management/menu-product/getByMenuId/MenuProductGetByMenuIdService";

export class MenuProductGetByMenuIdController {
    private readonly _cardId: number;
    private _response: GetByMenuIdResponseDto;

    constructor(cardId: number) {
        verifyIdFormat(cardId);
        this._cardId = cardId;
    }

    async execute() {
        const foundedMenuProducts = await MenuProductGetByMenuIdService.getByMenuId(this._cardId);
        this._response = foundedMenuProducts;
        return this._response;
    }
}

export type GetByMenuIdResponseDto = MenuProduct[];