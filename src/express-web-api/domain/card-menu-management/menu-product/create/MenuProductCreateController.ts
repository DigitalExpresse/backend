import {MenuProduct} from "@root/domain/card-menu-management/menu-product/MenuProduct";
import {MenuProductCreateService} from "@root/domain/card-menu-management/menu-product/create/MenuProductCreateService";

export class MenuProductCreateController {

    _requestData: MenuProductCreateRequestData;
    _response: MenuProductCreateResponseDto;

    constructor(requestData: MenuProductCreateRequestData) {
        MenuProductCreateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async execute(): Promise<MenuProductCreateResponseDto> {

        const newMenuProductInstance = new MenuProduct(this._requestData.menuId ,this._requestData.productId, this._requestData.categoryId, this._requestData.premium);

        const savedMenuProduct = await MenuProductCreateService.saveMenuProduct(newMenuProductInstance);

        this._response = {
            id: savedMenuProduct.id,
            menuId: savedMenuProduct.menuId,
            productId: savedMenuProduct.productId,
            categoryId: savedMenuProduct.categoryId,
            premium: savedMenuProduct.premium
        }
        return this._response;
    }
}

type MenuProductCreateRequestData = {
    menuId: number ;
    productId: number;
    categoryId: number;
    premium?: number;
}

type MenuProductCreateResponseDto = {
    id: number;
    menuId: number;
    productId: number;
    categoryId: number;
    premium?: number;
}