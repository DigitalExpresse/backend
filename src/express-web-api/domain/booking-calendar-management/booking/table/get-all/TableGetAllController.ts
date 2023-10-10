import {TableGetAllService} from "@root/domain/booking-calendar-management/booking/table/get-all/TableGetAllService";
import {ERROR_NOT_FOUND} from "@utils/messages/error_message";

export class TableGetAllController {


    public async getAllController() {

        const allTables = await TableGetAllService.getAllTables();

        if (allTables.length === 0) {
            throw new Error('Table ' + ERROR_NOT_FOUND.message );
        }

        return allTables;

    }


}