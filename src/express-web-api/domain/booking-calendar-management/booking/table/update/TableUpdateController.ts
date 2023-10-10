import {TableUpdateService} from "@root/domain/booking-calendar-management/booking/table/update/TableUpdateService";
import {Table} from "@prisma/client";

export class TableUpdateController {

    private readonly _requestData: TableUpdateControllerRequestBody

    constructor(requestData: TableUpdateControllerRequestBody) {
        TableUpdateService.verifyRequestData(requestData);
        this._requestData = requestData;
    }

    async updateController(): Promise<Table> {

        try {

            return await TableUpdateService.updateTable(this._requestData);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

export type TableUpdateControllerRequestBody = {
    id: number;
    name?: string;
    capacity?: number;
}






