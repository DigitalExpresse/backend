import {
    ServiceCreateService
} from "@root/domain/booking-calendar-management/calendar/service/create/ServiceCreateService";
import {Service} from "@root/domain/booking-calendar-management/calendar/service/Service";

export class ServiceCreateController {
    static async createServices(payload: {
        name: string,
        start_at: string,
        end_at: string,
        days: string []
    }[]) {
        const services = Service.payloadFormatter(payload)
        return await ServiceCreateService.updateServices(services);
    }
}