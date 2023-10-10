import {
    CategoryGetOneByIdService
} from "@root/domain/card-menu-management/category/getOneById/CategoryGetOneByIdService";

export class CategoryGetOneByIdController {
    private readonly _requestId: string;

    constructor(requestId: string) {
        CategoryGetOneByIdService.verifyRequestData(requestId);
        this._requestId = requestId;
    }

    async getOneByIdController() {
        try {
            const category = await CategoryGetOneByIdService.getOneById(this._requestId);
            return category;
        } catch (error) {
            throw new Error(error);
        }
    }
}

type CategoryGetOneByIdResponseDto = {
    id: string;
    name: string;
    parentId?: string;
};