import {HolidayRepository} from "@root/domain/booking-calendar-management/calendar/holiday/HolidayRepository";

export class HolidayCreateService {
    static async updateHoliday(payload: {
        name: string,
        startDate: Date,
        endDate: Date
    }[]) {
        await HolidayRepository.deleteAllHolidays()
        return HolidayRepository.createManyHolidays(payload)
    }
}