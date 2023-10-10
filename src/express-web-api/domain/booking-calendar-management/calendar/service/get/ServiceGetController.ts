import {ServiceGetService} from "@root/domain/booking-calendar-management/calendar/service/get/ServiceGetService";


export class ServiceGetController {
    /**
     * Get all services for a given day of the week (param is a date, it will be converted to a day of the week)
     * @param date the date (YYYY-MM-DDTHH:MM:SS.MMMZ) to get the services from
     * @param numberOfPeople the number of people to get the services for
     * @returns all services for a given day (Name of the service and the period of the service)
     */
    static async getAvailableTimes(date: Date, numberOfPeople: number): Promise<{
        name: string,
        dates: Date[]
    }[]> {
        return await ServiceGetService.findAvailableHours(date, numberOfPeople);
    }
}