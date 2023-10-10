import { MenuProductRepository } from "@root/domain/card-menu-management/menu-product/MenuProductRepository";
import { ERROR_INVALID_REQUEST, ERROR_NOT_FOUND } from "@utils/messages/error_message";
import {
    MenuProductUpdateRequestDto
} from "@root/domain/card-menu-management/menu-product/update/MenuProductUpdateController";

export class MenuProductUpdateService {
    static async updateMenuProduct(requestData: MenuProductUpdateRequestDto) {

        const allowedFields: Array<keyof MenuProductUpdateRequestDto> = ["menuId", "productId", "categoryId", "premium"];
        const dataToUpdate = this.returnFieldsNotNull(requestData, allowedFields);
        const updatedMenuProduct = await this.updateFieldsNotNull(dataToUpdate, Number(requestData.id));

        return updatedMenuProduct;
    }

    private static returnFieldsNotNull<T>(requestData: T, allowedFields: Array<keyof T>): Partial<T> {
        const fieldsNotNull: Partial<T> = {};

        for (const field of allowedFields) {
            if (requestData[field] !== undefined) {
                fieldsNotNull[field] = requestData[field];
            }
        }

        return fieldsNotNull;
    }

    private static async updateFieldsNotNull(dataToUpdate: any, id: number) {

        try {
            const updatedMenuProduct = await MenuProductRepository.update(id, dataToUpdate);
            return updatedMenuProduct;
        } catch (error) {
            if (error.code === "P2003") {
                throw new Error(ERROR_NOT_FOUND.message + " " + error.meta.field_name + " not found");
            }

            if (error.code === "P2025") {
                throw new Error(ERROR_NOT_FOUND.message + " Menu Product not found");
            }

            throw new Error(error);
        }
    }

    static verifyRequestData(requestData: MenuProductUpdateRequestDto) {

        if (requestData.menuId && typeof requestData.menuId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Invalid menu ID");
        }

        if (requestData.productId && typeof requestData.productId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Invalid product ID");
        }

        if (requestData.categoryId && typeof requestData.categoryId !== "number") {
            throw new Error(ERROR_INVALID_REQUEST.message + " Invalid category ID");
        }
    }
}