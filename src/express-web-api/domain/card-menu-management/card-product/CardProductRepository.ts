import {prisma} from "@root/ExpressApp";

export class CardProductRepository {

    static async save(cardProduct: any) {

        const newCardProduct = await prisma.cardProduct.create({
            data: {
                cardId: cardProduct.cardId,
                productId: cardProduct.productId,
                categoryId: cardProduct.categoryId
            }
        });

        return newCardProduct;
    }

    static async update(id, dataToUpdate) {

        const updatedCardProduct = await prisma.cardProduct.update({
            where: {
                id: id
            },
            data: dataToUpdate
        });

        return updatedCardProduct;
    }

    static async delete(id) {

        const deletedCardProduct = await prisma.cardProduct.delete({
            where: {
                id: id
            }
        });

        return deletedCardProduct;
    }

    static async findById(id) {

        const cardProduct = await prisma.cardProduct.findUnique({
            where: {
                id: id
            }
        });

        return cardProduct;
    }

    static async findAll() {

        const cardProducts = await prisma.cardProduct.findMany();
        return cardProducts;
    }

    static async findByCardId(cardId) {

        const cardProducts = await prisma.cardProduct.findMany({
            where: {
                cardId: cardId
            }
        });

        return cardProducts;
    }
}