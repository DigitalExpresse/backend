import { CategoryGetAllService } from "@root/domain/card-menu-management/category/getAll/CategoryGetAllService";
import { ERROR_NOT_FOUND } from "@utils/messages/error_message";

export class CategoryGetAllController {
    async getAllController() {
        const allCategories = await CategoryGetAllService.getAllCategories();

        if (allCategories.length === 0) {
            throw new Error("Category " + ERROR_NOT_FOUND.message);
        }

        return allCategories;
    }
}