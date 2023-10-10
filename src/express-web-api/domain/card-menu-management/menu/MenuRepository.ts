import {Menu} from "@prisma/client";
import {prisma} from "@root/ExpressApp";

export class MenuRepository {

    static async create(menu: Menu): Promise<Menu> {

        const newMenu = await prisma.menu.create({
            data: {
                name: menu.name,
                price: menu.price,
                description: menu.description
            }
        });

        return newMenu;
    }

    static async findAll(): Promise<Menu[]> {

        const menus = prisma.menu.findMany();

        return menus;
    }

    static async findById(id: number): Promise<Menu> {

        const menu = prisma.menu.findUnique({
            where: {
                id: id
            }
        });

        return menu;
    }

    static async update({dataToUpdate, id}): Promise<Menu> {
        const updatedMenu = prisma.menu.update({

            where: {
                id: Number(id)
            },
            data: dataToUpdate
        });

        return updatedMenu;
    }

    static async delete(id: number): Promise<Menu> {

        const deletedMenu = prisma.menu.delete({
            where: {
                id: id
            }
        });

        return deletedMenu;
    }

    static async findByMenuId(menuId: number) {

        const categories = await prisma.menuProduct.findMany({
            where: {menuId: menuId},
            select: {
                category: true
            }
        })

        return categories;
    }

}