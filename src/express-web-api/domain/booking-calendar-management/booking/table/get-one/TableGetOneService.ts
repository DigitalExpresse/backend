import {TableRepository} from "@root/domain/booking-calendar-management/booking/table/TableRepository";

export class TableGetOneService {
    static async getOneTable(id) {

        return await TableRepository.findById(Number(id));

    }

    static verifyRequestId(requestId) {

        const id = Number(requestId);

        if (requestId === undefined) {
            throw new Error('Request ID is undefined');
        } else if (typeof id !== 'number' || isNaN(id)) {
            throw new Error('Request ID is not a string');
        }
    }
}