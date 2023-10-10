import {ERROR_INVALID_REQUEST} from "@utils/messages/error_message";
import {Product} from "@root/domain/card-menu-management/product/Product";
import {ProductRepository} from "@root/domain/card-menu-management/product/ProductRepository";

export class ProductCreateService {

    static verifyRequestData(requestData) {

        if (requestData.name === undefined && requestData.price === undefined) {
            throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'name' et 'price' sont requis.");
        }

        if (!requestData.name || typeof requestData.name !== "string") {
            console.log(requestData)
            throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'name' est requis et doit être une chaîne de caractères.");
        }

        if (!requestData.price || typeof requestData.price !== "number" || requestData.price <= 0) {
            throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'price' est requis et doit être un nombre supérieur à 0.");
        }

        if (requestData.description && typeof requestData.description !== "string") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'description' doit être une chaîne de caractères de 100 caractères maximum.");
        }

        if (requestData.description && requestData.description.length > 100) {
            throw new Error(ERROR_INVALID_REQUEST.message + " Le champ 'description' doit être une chaîne de caractères de 100 caractères maximum.");
        }
    }

    static async createNewInstanceProduct(requestData) {
        const {name, description, price} = requestData;
        const newProductInstance = new Product(name, description, price);

        return newProductInstance;
    }

    static async saveNewProduct(newProductInstance): Promise<Product> {

        try {

            const newProduct = await ProductRepository.save(newProductInstance);
            return newProduct;

        } catch (e) {
            throw new Error(e);
        }

    }


}