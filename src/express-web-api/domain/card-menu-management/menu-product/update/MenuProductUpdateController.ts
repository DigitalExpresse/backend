import {MenuProductUpdateService} from "@root/domain/card-menu-management/menu-product/update/MenuProductUpdateService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class MenuProductUpdateController {
    private readonly _requestData: MenuProductUpdateRequestDto;
    private _responseDto: MenuProductUpdateResponseDto;

    constructor(requestData: any) {
        verifyIdFormat(this._requestData.id)
        MenuProductUpdateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async execute(): Promise<MenuProductUpdateResponseDto> {
        const updatedMenuProduct = await MenuProductUpdateService.updateMenuProduct(this._requestData);

        this._responseDto = {
            id: updatedMenuProduct.id,
            menuId: updatedMenuProduct.menuId,
            productId: updatedMenuProduct.productId,
            categoryId: updatedMenuProduct.categoryId,
            premium: updatedMenuProduct.premium
        };

        return this._responseDto;
    }
}

type MenuProductUpdateResponseDto = {
    id: number;
    menuId: number;
    productId: number;
    categoryId: number;
    premium?: number;
};

export type MenuProductUpdateRequestDto = {
    id: number;
    menuId?: number;
    productId?: number;
    categoryId?: number;
    premium?: number;
};