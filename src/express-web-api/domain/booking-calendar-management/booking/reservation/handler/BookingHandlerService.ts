import {
    ReservationRepository
} from "@root/domain/booking-calendar-management/booking/reservation/ReservationRepository";
import {
    CreateReservationPayload,
    UpdateReservationPayload
} from "@root/domain/booking-calendar-management/booking/reservation/Reservation";

export class BookingHandlerService {


    static async bookReservation(reservationPayload: CreateReservationPayload) {
        return await ReservationRepository.createReservation(reservationPayload);
    }

    static async confirmReservation(id: number) {
        return ReservationRepository.confirmReservation(id);
    }

    static async declineReservation(id: number) {
        return ReservationRepository.declineReservation(id);
    }

    static async noShowReservation(id: number) {
        return ReservationRepository.noShowReservation(id);
    }

    /**
     * Rebook a booking with new tables
     * @param id is the id of the booking to update
     * @param tables is a list of table ids, it replaces the old tables
     */
    static async reassignTablesOfReservation(id: number, tables: number[]) {
        return ReservationRepository.reassignTables(id, tables);
    }

    static async changeDateOfReservation(id: number, date: Date) {
        return ReservationRepository.changeDate(id, date);
    }

    static async updateReservation(id: number, reservationPayload: UpdateReservationPayload) {
        return ReservationRepository.updateReservation(id, reservationPayload);
    }


}
