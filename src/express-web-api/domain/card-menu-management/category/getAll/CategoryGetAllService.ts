import {CategoryRepository} from "@root/domain/card-menu-management/category/CategoryRepository";

export class CategoryGetAllService {
    static async getAllCategories() {
        try {
            const allCategories = await CategoryRepository.findAll();
            return allCategories;
        } catch (error) {
            throw new Error(error);
        }
    }
}
