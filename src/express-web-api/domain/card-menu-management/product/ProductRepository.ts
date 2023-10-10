import {prisma} from "@root/ExpressApp";

export class ProductRepository {

    static async save(newProductInstance) {

        return prisma.product.create({
            data: {
                name: newProductInstance.name,
                description: newProductInstance.description,
                price: newProductInstance.price
            }
        });
    }

    static async findById(id) {
        return prisma.product.findUnique({
            where: {
                id: id
            }
        });
    }

    static async findAll() {
        return prisma.product.findMany();
    }

    static async update(id, product ) {
        return prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: product.name,
                description: product.description,
                price: product.price
            }
        });
    }

    static async delete(id) {
        return prisma.product.delete({
            where: {
                id: id
            }
        });

}
}