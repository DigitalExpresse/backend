import {
    MenuProductGetOneByIdService
} from "@root/domain/card-menu-management/menu-product/getOneById/MenuProductGetOneByIdService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class MenuProductGetOneByIdController {
    private readonly _requestId: string;

    constructor(requestId: string) {
        this._requestId = requestId;
    }

    async execute() {
        try {
            verifyIdFormat(this._requestId)
            const menuProduct = await MenuProductGetOneByIdService.getOneById(this._requestId);
            return menuProduct;
        } catch (error) {
            throw new Error(error);
        }
    }
}

type MenuProductGetOneByIdResponseDto = {
    id: string;
    premium?: boolean;
    menuId: string;
    productId: string;
    categoryId: string;
};
