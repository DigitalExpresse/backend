import { CategoryRepository } from "@root/domain/card-menu-management/category/CategoryRepository";
import { ERROR_NOT_FOUND } from "@utils/messages/errorMessage";

export class CategoryGetOneByIdService {
    static verifyRequestData(requestId: string) {
        const id = Number(requestId);

        if (!requestId) {
            throw new Error("L'identifiant de la catégorie est requis.");
        }

        if (typeof id !== "number" || isNaN(id)) {
            throw new Error("id is not a number");
        }
    }

    static async getOneById(requestId: string) {
        const category = await CategoryRepository.findById(Number(requestId));

        if (!category) {
            throw new Error(ERROR_NOT_FOUND.message + " Category not found");
        }

        return category;
    }
}