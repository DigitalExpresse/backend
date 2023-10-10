import {
    ReservationRepository
} from "@root/domain/booking-calendar-management/booking/reservation/ReservationRepository";
import {TableRepository} from "@root/domain/booking-calendar-management/booking/table/TableRepository";


export class BookingGetService {
    /**
     * Get all reservations
     * @returns all reservations
     */
    static async getAllReservations() {
        return ReservationRepository.getAll();
    }

    static getReservationsFilteredByDate(
        {gte, lte}: {
            gte?: Date,
            lte?: Date
        }
    ) {
        if (gte && lte) {
            return ReservationRepository.getAllReservationBetweenDate(gte, lte);
        } else if (gte) {
            return ReservationRepository.getAllReservationGreaterThanDate(gte);
        } else if (lte) {
            return ReservationRepository.getAllReservationLessThanDate(lte);
        }
    }

    static async getReservationByMailOrMobileNumber(
        {email, mobileNumber}: {
            email?: string,
            mobileNumber?: string
        }
    ) {
        return ReservationRepository.getReservationByMobileNumberOrEmail({email, mobileNumber});
    }

    static async getPendingReservations() {
        return ReservationRepository.getPendingReservations();
    }

    static async getConfirmedReservations() {
        return ReservationRepository.getConfirmedReservations();
    }

    static async getAvailableTablesForRebooking(id: number) {
        // for the rebooking, we have to select all tables that are available + the table of the booking-calendar-management (because it's juste a rebinding of table)
        const reservation = await ReservationRepository.getById(id)
        const date = new Date(reservation.date);
        const freeTables = await TableRepository.getAvailableTables({date});
        const alreadyBookedTable = await TableRepository.getTableOfReservation(id);
        return [...freeTables, alreadyBookedTable];
    }

}
