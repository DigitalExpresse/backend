import {prisma} from "@root/ExpressApp";

export class ProductSupplementRepository {

    static async create(productId, name, price) {

        const newSupplement = await prisma.supplement.create({
            data: {
                name: name,
                price: price,
            }

        });

        const newProductSupplement = await prisma.supplementProduct.create({
            data: {
                supplementId: newSupplement.id,
                productId: productId,
            }
        });

        return { newSupplement, newProductSupplement}
    }

    static async delete(id) {
        return prisma.supplement.delete({
            where: {
                id: id
            }
        });
    }

    static async update(id, dataToUpdate) {
        return prisma.supplement.update({
            where: {
                id: id
            },
            data: dataToUpdate
        });
    }

    static async getProductSupplementByProductId(productId) {
        // la fonction doit retoruner tous les supplement lier a un produit
        const foundedSupplementProduct = await prisma.supplementProduct.findMany({
            where: {
                productId: productId
            }
        });

        return foundedSupplementProduct;
    }

    static async getSupplementById(supplementId) {
        return prisma.supplement.findUnique({
            where: {
                id: supplementId
            }
        });
    }
}

