import {MenuUpdateService} from "@root/domain/card-menu-management/menu/update/MenuUpdateService";

export class MenuUpdateController {

    _requestData: MenuUpdateRequestData;
    _responseDto: MenuUpdateResponseDto;

    constructor(requestData: MenuUpdateRequestData) {
        MenuUpdateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async updateController() {

        const updatedMenu = await MenuUpdateService.updateMenu(this._requestData);

        this._responseDto = { id: String(updatedMenu.id), name: updatedMenu.name, price: updatedMenu.price, description: updatedMenu.description }

        return this._responseDto;

    }
}

type MenuUpdateRequestData = {
    id: string;
    name?: string;
    price?: number;
    description?: string;
}

type MenuUpdateResponseDto = {
    id: string;
    name: string;
    price: number;
    description?: string;
}