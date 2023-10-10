import {prisma} from "@root/ExpressApp";
import { Category } from "./Category";

export class CategoryRepository {

    static async create(category: Category) {
        const newCategory = await prisma.category.create({
            data: {
                name: category.name,
                parentId: category.parentId,
            }
        });

        return newCategory;
    }

    static async update(id: number, category: { name: any; parentId: any; }) {
        const updatedCategory = await prisma.category.update({
            where: {id: Number(id)},
            data: {
                name: category.name,
                parentId: category.parentId,
            }
        });

        return updatedCategory;
    }

    static async delete(id: number) {
        const deletedCategory = await prisma.category.delete({
            where: {id: id},
        });

        return deletedCategory;
    }

    static async findById(id: number) {
        const category = await prisma.category.findUnique({
            where: {id: id},
        });

        return category;
    }

    static async findAll() {

        const categories = await prisma.category.findMany();

        return categories;
    }

    static async findByCardId(cardId: number) {

        const categories = await prisma.cardProduct.findMany({
            where: {cardId: cardId},
            select: {
                category: true
            }
        })

        return categories;
    }

}