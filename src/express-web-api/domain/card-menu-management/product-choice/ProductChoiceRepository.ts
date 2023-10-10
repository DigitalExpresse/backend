import {prisma} from "@root/ExpressApp";

export class ProductChoiceRepository {

    static async createChoiceType(name) {

        const newChoiceType = await prisma.choiceType.create({
            data: {
                name: name
            }
        })

        return newChoiceType

    }

    static async createOption(name, choiceTypeId) {

        const newOption = await prisma.option.create({
            data: {
                name: name, choiceTypeId: choiceTypeId
            }
        })

        return newOption

    }

    static async createOptionProduct(optionId, productId) {

        const newOptionProduct = await prisma.optionProduct.create({
            data: {
                productId, optionId,
            }
        })

        return newOptionProduct;

    }

    static async deleteChoiceType(choiceTypeId) {

        await prisma.choiceType.delete({
            where: {id: choiceTypeId}
        })
        return;
    }

    static async updateChoiceTypeProduct(choiceTypeId, name) {

        const updatedProductChoice = await prisma.choiceType.update({
            where: {id: choiceTypeId}, data: {name: name}
        })

        return updatedProductChoice;
    }

    static async updateOption(optionId, name) {

        const updatedOption = await prisma.option.update({
            where: {id: optionId}, data: {name: name}
        })

        return updatedOption;
    }

    static async getProductChoiceTypeAndOptionByProductId(productId) {

        const productChoice = await prisma.product.findUnique({
            where: {id: productId},
            include: {
                supplementProducts: {
                    include: {
                        supplement: true
                    }
                },
                optionProducts: {
                    include: {
                        option: {
                            include: {
                                choiceType: true
                            }
                        }
                    }
                }
            }

        });

        return productChoice;
    }

}