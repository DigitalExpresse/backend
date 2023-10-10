import {ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/error_message";
import {Category} from "@root/domain/card-menu-management/category/Category";
import {CategoryRepository} from "@root/domain/card-menu-management/category/CategoryRepository";

export class CategoryCreateService {

    static verifyRequestData(requestData: any): void {

        if (!requestData.name || typeof requestData.name !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + "Le champ 'name' est requis et doit être une chaîne de caractères.");
        }

        if (requestData.parentId && typeof requestData.parentId !== "number" || requestData.parentId <= 0) {
            throw new Error(ERROR_INVALID_REQUEST.message + "Le champ 'parentId' doit être un nombre entier positif.");
        }
    }

    static createNewCategoryInstance (requestData) {

        const newCategoryInstance = new Category(requestData.name, requestData.parentId);

        return newCategoryInstance;
    }

    static async saveCategory (newCategoryInstance: Category) {

        try {

            const createdCategory = await CategoryRepository.create(newCategoryInstance);
            return createdCategory;

        } catch (error) {
            if (error.code === 'P2003') {
                throw new Error(ERROR_NOT_FOUND.message + " La catégorie parente avec l'id "+ newCategoryInstance.parentId + " n'existe pas");
            }
            throw new Error(error.message);
        }

    }
}