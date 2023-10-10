import {HolidayRepository} from "@root/domain/booking-calendar-management/calendar/holiday/HolidayRepository";

export class HolidayGetController {
    static getHolidays() {

        const response = HolidayRepository.getHolidays()
        console.log('response 2', response)
        return response;
    }
}