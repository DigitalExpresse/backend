import {
    ProductSupplementRepository
} from "@root/domain/card-menu-management/product-supplement/ProductSupplementRepository";
import {SupplementProduct} from "@prisma/client";

export class ProductSupplementGetByProductIdService {

    static async getByProductId(productId: number): Promise<SupplementProduct[]> {

        try {

            const foundProductSupplements = await ProductSupplementRepository.getProductSupplementByProductId(productId);

            const foundedSupplement = [];

            for (const supplementProduct of foundProductSupplements) {
                const supplement = await ProductSupplementRepository.getSupplementById(supplementProduct.supplementId);
                foundedSupplement.push(supplement);
            }

            return foundedSupplement;


        } catch (error) {
            throw new Error(error.message);
        }

    }

}