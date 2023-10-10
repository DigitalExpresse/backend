import {Table} from "@root/domain/booking-calendar-management/booking/table/Table";
import {Client} from "@root/domain/client/Client";
import {Status} from "@prisma/client";

export class Reservation {

    table: Table;
    client: Client;
    date: Date;
    comment: string;
    id?: number;

    constructor(
        table: Table,
        client: Client,
        date: Date,
        comment: string,
        id?: number
    ) {
        this.table = table;
        this.client = client;
        this.date = date;
        this.comment = comment;
        this.id = id;
    }

    static delimitDate(date: Date, hours: number = 1, minutes: number = 30) {
        const borneInf = new Date(date);
        borneInf.setUTCHours(borneInf.getUTCHours() - hours);
        borneInf.setMinutes(borneInf.getMinutes() - minutes);
        const borneSup = new Date(date);
        borneSup.setUTCHours(borneSup.getUTCHours() + hours);
        borneSup.setMinutes(borneSup.getMinutes() + minutes);
        return {borneInf, borneSup}
    }

    static sortDates = (a: Date, b: Date): Date[] => {
        if (a < b) {
            return [a, b];
        } else {
            return [b, a];
        }
    }


}

export type UpdateReservationPayload = {
    numberOfPersons: number,
    comment?: string,
    tables: number[],
    date: Date,
    status: Status,
    Client: {
        id: number,
        email: string,
        mobileNumber?: string,
        firstname: string,
        lastname?: string,
        count_reservations?: number,
        count_no_shows?: number,
    }
}

export type CreateReservationPayload = {
    email: string,
    mobileNumber?: string,
    firstname: string,
    lastname: string,
    date: Date,
    numberOfPersons: number,
    comment?: string,
    tables: number[]
}