import {ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/errorMessage";
import {CategoryRepository} from "@root/domain/card-menu-management/category/CategoryRepository";

export class CategoryDeleteService {
    static verifyRequestData(requestId: string): void {
        if (!requestId) {
            throw new Error("L'identifiant de la catégorie est requis.");
        }

        const id = Number(requestId);

        if (typeof id !== "number" || isNaN(id)) {
            throw new Error(ERROR_INVALID_REQUEST.message + " id is not a number");
        }
    }

    static async deleteCategory(requestId: string): Promise<void> {
        try {
            await CategoryRepository.delete(Number(requestId));
        } catch (error) {
            if (error.code === "P2025") {
                throw new Error(ERROR_NOT_FOUND.message + " Category not found");
            }
            throw new Error(error);
        }
    }
}