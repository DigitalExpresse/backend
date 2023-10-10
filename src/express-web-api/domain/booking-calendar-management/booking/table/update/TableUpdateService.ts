import {ERROR_ALREADY_EXIST, ERROR_INVALID_REQUEST, ERROR_NOT_FOUND} from "@utils/messages/error_message";
import {TableRepository} from "@root/domain/booking-calendar-management/booking/table/TableRepository";
import {
    TableUpdateControllerRequestBody
} from "@root/domain/booking-calendar-management/booking/table/update/TableUpdateController";

export class TableUpdateService {

    static async updateTable(requestData) {

        try {

            const allowedFields = ['name', 'capacity'];
            const dataToUpdate = TableUpdateService.returnFieldsNotNull(requestData, allowedFields);

            return await TableUpdateService.updateFieldsNotNull(dataToUpdate, Number(requestData.id));

        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error('Table name ' + ERROR_ALREADY_EXIST.message);
            }
            if (error.code === 'P2025') {
                throw new Error('Table ' + ERROR_NOT_FOUND.message);
            }
            throw new Error(error);
        }
    }


    static returnFieldsNotNull(requestData: any, allowedFields: string[]): any {

        const fieldsNotNull: any = {};

        for (const field of allowedFields) {
            if (requestData[field] !== undefined) {
                fieldsNotNull[field] = requestData[field];
            }
        }

        return fieldsNotNull;
    }

    static async updateFieldsNotNull(dataToUpdate: any, id: number) {

        return await TableRepository.update({dataToUpdate, id});

    }


    static verifyRequestData(requestData: TableUpdateControllerRequestBody) {

        let {id, name, capacity} = requestData;
        id = Number(id);

        if (id === undefined) {
            throw new Error(ERROR_INVALID_REQUEST + ' is undefined');
        } else if (typeof id !== 'number' || isNaN(id)) {
            throw new Error(ERROR_INVALID_REQUEST.message + ' id is not a number');
        } else if (name === undefined && capacity === undefined) {
            throw new Error(ERROR_INVALID_REQUEST.message + ' no data to update');
        } else if (name !== undefined && typeof name !== 'string') {
            throw new Error(ERROR_INVALID_REQUEST.message + ' name is not a string');
        } else if (capacity !== undefined && typeof capacity !== 'number') {
            throw new Error(ERROR_INVALID_REQUEST.message + 'capacity is not a number');
        }

    }
}