import {
    ProductSupplementRepository
} from "@root/domain/card-menu-management/product-supplement/ProductSupplementRepository";
import {ERROR_ALREADY_EXIST, ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class ProductSupplementCreateService {

    static async createNewProductSupplement(productId, name, price) {

        try {

            return await ProductSupplementRepository.create(Number(productId), name, price);

        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error(ERROR_ALREADY_EXIST.message + ` Product supplement with name ${name} already exists`)
            }

            if (error.code === 'P2003') {
                throw new Error(ERROR_NOT_FOUND.message + ` Product with id ${productId} not found`)
            }
            throw new Error(error.message)
        }

    }

    static verifyRequestData(productId, name, price) {
        if (!productId || !name || !price) {
            throw new Error(ERROR_INVALID_REQUEST.message + 'Product id, name and price are required')
        }

        if (typeof name !== 'string') {
            throw new Error(ERROR_INVALID_REQUEST.message + 'Name must be a string')
        }

        if (typeof price !== 'number') {
            throw new Error(ERROR_INVALID_REQUEST.message + 'Price must be a number')
        }

        if (price < 0) {
            throw new Error(ERROR_INVALID_REQUEST.message + 'Price must be a positive number')
        }

    }
}