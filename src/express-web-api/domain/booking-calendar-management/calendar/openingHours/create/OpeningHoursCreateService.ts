import {Days} from "@prisma/client";
import {
    OpeningHoursRepository
} from "@root/domain/booking-calendar-management/calendar/openingHours/OpeningHoursRepository";

export class OpeningHoursCreateService {

    static async createOpeningHours(openingHours: {
        name: string,
        start_at: Date,
        end_at: Date,
        days: Days[]
    } []) {
        return Promise.all(openingHours.map(async openingHour => {
            return await OpeningHoursRepository.createOneOpeningHours(openingHour.name, openingHour.start_at, openingHour.end_at, openingHour.days);
        }))

    }

    static async updateOpeningHours(openingHours: {
        name: string,
        start_at: Date,
        end_at: Date,
        days: Days[]
    } []) {
        await OpeningHoursRepository.deleteAllOpeningHours();
        return await this.createOpeningHours(openingHours);
    }


}