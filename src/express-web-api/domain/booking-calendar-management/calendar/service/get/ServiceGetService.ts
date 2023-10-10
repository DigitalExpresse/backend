import {ServiceRepository} from "@root/domain/booking-calendar-management/calendar/service/ServiceRepository";
import {TableGetAllService} from "@root/domain/booking-calendar-management/booking/table/get-all/TableGetAllService";
import {Service} from "@root/domain/booking-calendar-management/calendar/service/Service";

export class ServiceGetService {
    /**
     * Get all services for a given date, split them and return an array of dates that are available for each service
     * @param date the date (YYYY-MM-DDTHH:MM:SSZ) to get the services from
     * @returns an array of {name: string, dates: Date[]} that are all the services and their available dates.
     */
    static async calendarMaker(date: Date): Promise<{
        name: string,
        dates: Date[]
    }[]> {
        const servicePeriod = await ServiceRepository.getServiceForAGivenDate(date);

        let result: {
            name: string,
            dates: Date[]
        }[] = [];
        for (const rawService of servicePeriod) {
            const treatedService = Service.serviceSplitter(rawService, date);
            result.push(treatedService);
        }
        return result;
    }

    /**
     * Keep only the services that have enough capacity for the given number of people
     * @param date the date (YYYY-MM-DDTHH:MM:SSZ) to get the services from
     * @param capacity the number of people to find a table for
     * @returns an array of {name: string, dates: Date[]} with only the services that have enough capacity for the given number of people
     */
    static async findAvailableHours(date: Date, capacity: number): Promise<{
        name: string,
        dates: Date[]
    }[]> {
        const calendar: {
            name: string,
            dates: Date[]
        }[] = await this.calendarMaker(date);
        const result: {
            name: string,
            dates: Date[]
        }[] = [];
        for (const period of calendar) {
            const dates: Date[] = [];
            for (const date of period.dates) {
                const capacitySum = await TableGetAllService.getCapacity(date);
                if (capacitySum >= capacity) {
                    dates.push(date);
                }
            }
            if (dates.length > 0) {
                result.push({name: period.name, dates: dates});
            }
        }
        return result;
    }
}