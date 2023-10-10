import {TableRepository} from "@root/domain/booking-calendar-management/booking/table/TableRepository";
import {TableCreateService} from "@root/domain/booking-calendar-management/booking/table/create/TableCreateService";
import {Table} from "@root/domain/booking-calendar-management/booking/table/Table";
import {ERROR_ALREADY_EXIST} from "@utils/messages/error_message";

export class TableCreateController {

    _requestData: TableCreateControllerRequestBody;

    constructor(requestData: TableCreateControllerRequestBody) {
        this._requestData = requestData;
        TableCreateService.verifyRequestData(this._requestData);
    }

    public async createController(): Promise<Table> {

        try {
            const newTableInstance = new Table(this._requestData.name, Number(this._requestData.capacity))

            return await TableRepository.create(newTableInstance);

        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error('Table with this name ' + ERROR_ALREADY_EXIST.message);
            }
            throw new Error('Failed to create table: ' + error);
        }

    }
}

type TableCreateControllerRequestBody = {
    name: string;
    capacity: number;
}