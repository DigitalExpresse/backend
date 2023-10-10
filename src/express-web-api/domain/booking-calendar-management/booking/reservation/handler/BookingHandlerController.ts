import {
    BookingHandlerService as BookingService
} from "@root/domain/booking-calendar-management/booking/reservation/handler/BookingHandlerService";
import {ClientRepository} from "@root/domain/client/ClientRepository";
import {HolidayRepository} from "@root/domain/booking-calendar-management/calendar/holiday/HolidayRepository";
import {TableGetAllService} from "@root/domain/booking-calendar-management/booking/table/get-all/TableGetAllService";
import {Table} from "@root/domain/booking-calendar-management/booking/table/Table";
import {Mailer} from "@root/domain/shared/Mailer";
import {EmailType} from "@root/email-template/EmailType";
import {UpdateReservationPayload} from "@root/domain/booking-calendar-management/booking/reservation/Reservation";

export class BookingHandlerController {
    static async bookReservation(request: {
        email: string,
        mobileNumber?: string,
        firstname: string,
        lastname: string,
        date: Date,
        numberOfPersons: number,
        comment?: string,
        tables: number[]
    }) {


        if (await HolidayRepository.isHoliday(request.date)) {
            throw new Error("The date is a holiday");
        }
        if (await TableGetAllService.getCapacity(request.date) < request.numberOfPersons) {
            throw new Error("The capacity is not enough");
        }
        if (request.email && request.mobileNumber) {
            if (!(await ClientRepository.AreMailAndPhoneCompatible(request.email, request.mobileNumber))) {
                console.error("The email and mobile number are linked to different clients");
            }
        }

        const availableTable = await TableGetAllService.AvailableTables(request.date);
        request.tables = Table.bindTables(availableTable, request.numberOfPersons)
        const mailer = new Mailer();

        // check if mail is AND match the regex of email

        if (request.email && request.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {

            await mailer.sendEmail(request.email, EmailType.WAITING_RESERVATION_CONFIRMATION, {
                clientFullName: request.firstname + ' ' + request.lastname,
                reservationDate: request.date.toString().substring(0, 10),
                reservationHour: request.date.toString().substring(12, 16),
                numberOfPeople: request.numberOfPersons,
            });

            await mailer.sendEmail(request.email, EmailType.NOTIF_ADMIN_NEW_RESERVATION, {
                clientFullName: request.firstname + ' ' + request.lastname,
                reservationDate: request.date.toString().substring(0, 10),
                reservationHour: request.date.toString().substring(12, 16),
                numberOfPeople: request.numberOfPersons,
            });
        } else {
            console.log("email is not valid")
        }


        return await BookingService.bookReservation(request);
    }

    static async decisionReservation(reservationId: number, decision: boolean) {
        if (decision === true) {
            const response = BookingService.confirmReservation(reservationId);
            console.log(response.then(async (value) => {
                const mailer = new Mailer();
                await mailer.sendEmail(value.Client.email, EmailType.CONFIRMATION_RESERVATION, {
                    clientFullName: value.Client.firstname + ' ' + value.Client.lastname,
                    reservationDate: value.date.toString().substring(0, 10),
                    reservationHour: value.date.toString().substring(12, 16),
                    numberOfPeople: value.numberOfPersons,
                });

            }))
            return response;
        } else {
            return BookingService.declineReservation(reservationId)
        }
    }

    static async noShowReservation(reservationId: number) {
        return BookingService.noShowReservation(reservationId);
    }

    /**
     * Rebook a booking-calendar-management with new tables
     * @param reservationId is the id of the booking-calendar-management to update
     * @param tables is a list of table ids, it replaces the old tables
     */
    static async reassignTables(reservationId: number, tables: number[]) {
        return BookingService.reassignTablesOfReservation(reservationId, tables);
    }

    static async changeDate(reservationId: number, date: Date) {
        return BookingService.changeDateOfReservation(reservationId, date);
    }

    static async updateReservation(reservationId: number, request: UpdateReservationPayload) {
        return BookingService.updateReservation(reservationId, request);
    }

}