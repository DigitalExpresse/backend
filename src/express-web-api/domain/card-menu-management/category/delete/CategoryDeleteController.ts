import {CategoryDeleteService} from "@root/domain/card-menu-management/category/delete/CategoryDeleteService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class CategoryDeleteController {
    private readonly requestId: string;

    constructor(requestId: string) {
        this.requestId = requestId;
    }

    async deleteController(): Promise<void> {

        verifyIdFormat(this.requestId)

        CategoryDeleteService.verifyRequestData(this.requestId);

        await CategoryDeleteService.deleteCategory(this.requestId);
    }
}