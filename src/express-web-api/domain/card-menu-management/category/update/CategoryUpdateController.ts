import { CategoryUpdateService } from "@root/domain/card-menu-management/category/update/CategoryUpdateService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class CategoryUpdateController {
    private readonly requestData: CategoryUpdateRequestData;
    private responseDto: CategoryUpdateResponseDto;

    constructor(requestData: CategoryUpdateRequestData) {
        this.requestData = requestData;
    }

    async updateController(): Promise<CategoryUpdateResponseDto> {

        verifyIdFormat(this.requestData.id)
        CategoryUpdateService.verifyRequestData(this.requestData);

        const updatedCategory = await CategoryUpdateService.updateCategory(this.requestData);

        this.responseDto = {
            id: String(updatedCategory.id),
            name: updatedCategory.name,
        };

        return this.responseDto;
    }
}

interface CategoryUpdateRequestData {
    id: string;
    name?: string;
    description?: string;
}

interface CategoryUpdateResponseDto {
    id: string;
    name: string;
    description?: string;
}
