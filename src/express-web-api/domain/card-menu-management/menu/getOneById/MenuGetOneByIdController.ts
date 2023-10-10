import {MenuGetOneByIdService} from "@root/domain/card-menu-management/menu/getOneById/MenuGetOneByIdService";

export class MenuGetOneByIdController {

    private readonly _requestId: string;

    constructor(requestId: string) {
        MenuGetOneByIdService.verifyRequestData(requestId);
        this._requestId = requestId;
    }

    async getOneByIdController() {

        try {

            const menu = await MenuGetOneByIdService.getOneById(this._requestId);

            return menu;

        } catch (error) {
            throw new Error(error);

        }

    }

}

type MenuGetOneByIdResponseDto = {
    id: string;
    name: string;
    price: number;
    description?: string;
}