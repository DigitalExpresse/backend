import {CategoryCreateService} from "@root/domain/card-menu-management/category/create/CategoryCreateService";

export class CategoryCreateController {

    _requestData: CategoryCreateControllerRequestDto;
    _response: CategoryCreateControllerResponseDto;

    constructor(requestData: CategoryCreateControllerRequestDto) {
        CategoryCreateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async execute() {

        const newCategoryInstance = CategoryCreateService.createNewCategoryInstance(this._requestData);

        const newCategory = await CategoryCreateService.saveCategory(newCategoryInstance);

        this._response = {
            id: newCategory.id,
            name: newCategory.name,
            parentId: newCategory.parentId,
        }

        return this._response;
    }
}

type CategoryCreateControllerRequestDto = {
    name: string;
    parentId?: number;
}

type CategoryCreateControllerResponseDto = {
    id: number;
    name: string;
    parentId?: number;
}