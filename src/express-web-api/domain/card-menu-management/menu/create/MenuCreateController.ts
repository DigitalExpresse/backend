import {MenuCreateService} from "@root/domain/card-menu-management/menu/create/MenuCreateService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class MenuCreateController {

    private readonly _requestData: MenuCreateRequestData;
    private _responseDto: MenuCreateResponseDto;

    constructor(requestData: MenuCreateRequestData) {
        MenuCreateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async createController() {

        verifyIdFormat(this._requestData.price)

        const newMenuInstance = await MenuCreateService.createNewInstanceMenu(this._requestData);

        const newMenu = await MenuCreateService.saveNewMenu(newMenuInstance);

        this._responseDto = { id: String(newMenu.id), name: newMenu.name, price: newMenu.price, description: newMenu.description }

        return this._responseDto;
    }
}

type MenuCreateRequestData = {
    name: string;
    price: number;
    description?: string;
}

type MenuCreateResponseDto = {
    id: string;
    name: string;
    price: number;
    description?: string;
}