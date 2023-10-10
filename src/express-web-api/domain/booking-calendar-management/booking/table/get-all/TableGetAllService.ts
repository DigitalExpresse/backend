import {TableRepository} from "@root/domain/booking-calendar-management/booking/table/TableRepository";
import {Table} from "@prisma/client";

export class TableGetAllService {

    static async getAllTables(): Promise<Table[]> {

        return await TableRepository.findAll();

    }

    static async AvailableTables(date: Date) {
        return await TableRepository.getAvailableTables({date: date});
    }

    static async getCapacity(date: Date) {
        return TableRepository.getCapacity(date);
    }


}