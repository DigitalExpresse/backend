import {
    BookingGetService
} from "@root/domain/booking-calendar-management/booking/reservation/get/BookingGetService";
import {
    TableGetAllService
} from "@root/domain/booking-calendar-management/booking/table/get-all/TableGetAllService";

export class BookingGetController {


    /**
     * Get all reservations
     * @returns all reservations of the database in an array
     */
    static async getAllReservations({gte, lte}: {
        gte?: Date,
        lte?: Date
    }) {
        try {
            if (gte || lte) {
                return await BookingGetService.getReservationsFilteredByDate({gte, lte});
            } else {
                return await BookingGetService.getAllReservations();
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get the sum of the capacity of all tables that are not reserved at the given date
     * @param date the date to look for the total capacity (YYYY-MM-DDTHH:MM:SS.MMMZ)
     * @returns the sum of the capacity of all tables that are not reserved at the given date
     */
    static async getCapacityOfDate(date: Date) {
        return await TableGetAllService.getCapacity(date);
    }

    static async getPendingReservations() {
        return BookingGetService.getPendingReservations();
    }

    static async getConfirmedReservations() {
        return BookingGetService.getConfirmedReservations();
    }

    static async getAvailableTablesForRebooking(id: number) {
        return BookingGetService.getAvailableTablesForRebooking(id);
    }

}
