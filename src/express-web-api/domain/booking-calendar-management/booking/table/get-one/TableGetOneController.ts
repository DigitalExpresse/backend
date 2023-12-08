import {TableGetOneService} from "@root/domain/booking-calendar-management/booking/table/get-one/TableGetOneService";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class TableGetOneController {
    _requestId: string;

    constructor(requestId: string) {
        this._requestId = requestId;
        TableGetOneService.verifyRequestId(this._requestId);
    }

    public async getOneController() {

        const table = await TableGetOneService.getOneTable(this._requestId);

        if (table === null) {
            throw new Error('Table ' + ERROR_NOT_FOUND.message );
        }
        return table;

    }
}