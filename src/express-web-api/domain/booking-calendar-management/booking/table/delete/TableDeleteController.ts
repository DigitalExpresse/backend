import {TableRepository} from "@root/domain/booking-calendar-management/booking/table/TableRepository";
import {ERROR_NOT_FOUND} from "@utils/messages/errorMessage";

export class TableDeleteController {

    private readonly id: number;

    constructor(id: number) {

        this.id = id;
    }
    async deleteController() {

        try {

            await TableRepository.delete(Number(this.id));

            return;

        } catch (error) {

            if (Number.isNaN(Number(this.id))) {
                throw new Error('Table id must be a number');
            }
            if (error.code === 'P2025') {
                throw new Error('Table with this id ' + ERROR_NOT_FOUND.message);
            }
            console.log(Number(this.id));
            throw new Error('Failed to delete table: ' + error);
        }


    }
}