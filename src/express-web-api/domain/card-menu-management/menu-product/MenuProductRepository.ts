import {prisma} from "@root/ExpressApp";
export class MenuProductRepository {

    static async save(menuProduct: any) {

        const newMenuProduct = await prisma.menuProduct.create({
            data: {
                premium: menuProduct.premium,
                menuId: menuProduct.menuId,
                productId: menuProduct.productId,
                categoryId: menuProduct.categoryId
            }
        });

        return newMenuProduct;
    }

    static async update(id, dataToUpdate) {

        const updatedMenuProduct = await prisma.menuProduct.update({
            where: {
                id: id
            },
            data: dataToUpdate
        });

        return updatedMenuProduct;

    }

    static async delete(id) {

            const deletedMenuProduct = await prisma.menuProduct.delete({
                where: {
                    id: id
                }
            });

            return deletedMenuProduct;
    }

    static async findById(id) {

            const menuProduct = await prisma.menuProduct.findUnique({
                where: {
                    id: id
                }
            });

            return menuProduct;
    }

    static async findAll() {

        const menuProducts = await prisma.menuProduct.findMany();
        return menuProducts;
    }

    static async findByMenuId(cardId) {

        const menuProducts = await prisma.menuProduct.findMany({
            where: {
                menuId: cardId
            }
        });

        return menuProducts;
    }



}