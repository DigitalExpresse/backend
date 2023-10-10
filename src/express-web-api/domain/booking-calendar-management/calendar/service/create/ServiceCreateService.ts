import {ServiceRepository} from "@root/domain/booking-calendar-management/calendar/service/ServiceRepository";
import {Days} from "@prisma/client";

export class ServiceCreateService {


    static async createServices(services: {
        name: string,
        start_at: Date,
        end_at: Date,
        days: Days []
    }[]) {
        return await Promise.all(services.map(async service => {
            return await ServiceRepository.createOneService(service.name, service.start_at, service.end_at, service.days);
        }));
    }

    static async updateServices(services: {
        name: string,
        start_at: Date,
        end_at: Date,
        days: Days []
    }[]) {
        await ServiceRepository.deleteAllServices();
        return await this.createServices(services);
    }

}