import {HolidayRepository} from "@root/domain/booking-calendar-management/calendar/holiday/HolidayRepository";
import {Holiday} from "@root/domain/booking-calendar-management/calendar/holiday/Holiday";

export class HolidayCreateController {
    static async updateHoliday(payload: any) {

        if (Holiday.isPayloadValid(payload)) {
            const holidays = payload.map((holiday: any) => {
                return {
                    name: holiday.name,
                    startDate: new Date(holiday.startDate),
                    endDate: new Date(holiday.endDate)
                }
            });
            await HolidayRepository.deleteAllHolidays();
            return await HolidayRepository.createManyHolidays(holidays);
        } else {
            throw new Error('Invalid payload, it must be {name: string, startDate: Date, endDate: Date}[]');
        }
    }
}