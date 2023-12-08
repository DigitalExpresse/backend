import {
    ProductSupplementRepository
} from "@root/domain/card-menu-management/product-supplement/ProductSupplementRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class ProductSupplementDeleteService {

    static async deleteProductSupplement(supplementId: number) {

        try {
            await ProductSupplementRepository.delete(Number(supplementId));
            return;
        } catch (error) {
            if (error.code === "P2025") {
                throw new Error(ERROR_NOT_FOUND.message + " product supplement not found");
            }
            throw new Error(error.message);
        }

    }

}