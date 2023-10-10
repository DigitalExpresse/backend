import {Days} from "@prisma/client";

export class Service {


    /**
     * Receive a date and a service (start_at and end_at) and return an array of dates that are available for this service
     * @param rawService the service to split
     * @param date the date to split the service from
     * @param step the step between each date (in minutes) (default: 15)
     */
    static serviceSplitter(rawService: any, date: Date, step: number = 15): {
        name: string,
        dates: Date[]
    } {
        const treatedService = {} as {
            name: string,
            dates: Date[]
        };

        const dates = [];
        const [starting_hour, starting_minutes] = [rawService.Period.start_at.getUTCHours(), rawService.Period.start_at.getMinutes()];
        const [ending_hour, ending_minutes] = [rawService.Period.end_at.getUTCHours(), rawService.Period.end_at.getMinutes()];

        let current_date = new Date(date.setUTCHours(starting_hour, starting_minutes));
        dates.push(new Date(current_date));

        while (current_date.getUTCHours() !== ending_hour || current_date.getMinutes() !== ending_minutes) {
            current_date.setMinutes(current_date.getMinutes() + step);
            dates.push(new Date(current_date));
        }

        treatedService["name"] = rawService.Service.name;
        treatedService["dates"] = dates;
        return treatedService;
    }


    /**
     * the payload formatter transform
     * {name: string, start_at: string, end_at: string, days: string []}
     * into
     * {name: string, start_at: Date, end_at: Date, days: Days []}
     */
    static payloadFormatter(payload: {
        name: string,
        start_at: string,
        end_at: string,
        days: string []
    }[]): {
        name: string,
        start_at: Date,
        end_at: Date,
        days: Days []
    }[] {
        return payload.map(service => {
            return {
                name: service.name,
                start_at: new Date(service.start_at),
                end_at: new Date(service.end_at),
                days: service.days.map(day => day as Days)
            }
        })
    }

}