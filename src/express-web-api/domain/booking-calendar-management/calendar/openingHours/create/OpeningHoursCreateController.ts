import {OpeningHours} from "@root/domain/booking-calendar-management/calendar/openingHours/OpeningHours";
import {
    OpeningHoursCreateService
} from "@root/domain/booking-calendar-management/calendar/openingHours/create/OpeningHoursCreateService";

export class OpeningHoursCreateController {

    static async createOpeningHours(payload: {
        name: string,
        start_at: string,
        end_at: string,
        days: string []
    }[]) {
        const openingHours = OpeningHours.payloadFormatter(payload)
        return await OpeningHoursCreateService.updateOpeningHours(openingHours);
    }

}