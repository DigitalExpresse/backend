import {prisma} from "@root/ExpressApp";
import {Days} from "@prisma/client";
import {Period} from "@root/domain/booking-calendar-management/calendar/period/Period";
import {PeriodRepository} from "@root/domain/booking-calendar-management/calendar/period/PeriodRepository";


export class ServiceRepository {
    static async getAll(): Promise<{
        name: string,
        start_at: Date,
        end_at: Date,
        days: Days []
    }[]> {
        const services = await prisma.service.findMany(
            {
                select: {
                    name: true,
                    Service_Period: {
                        select: {
                            Period: {
                                select: {
                                    start_at: true,
                                    end_at: true,
                                    dayOfWeek: true,
                                }
                            }
                        }
                    }
                }
            }
        )
        // TODO: split the array of services into an array of services with the same name, start_at ans end_at (not only the same name)
        return services.map(service => {
            return {
                name: service.name,
                start_at: service.Service_Period[0].Period.start_at,
                end_at: service.Service_Period[0].Period.end_at,
                days: service.Service_Period.map(servicePeriod => servicePeriod.Period.dayOfWeek)
            }
        })
    }

    /**
     * Get all services for a given day (Monday, Tuesday, etc.)
     * @param day the day to get the services (Monday, Tuesday, etc.) from enum Days
     * @returns all services for a given day (Name of the service and the period of the service)
     */
    static async getServiceForAGivenDay(day: Days) {
        return prisma.servicePeriod.findMany({
            select: {
                Period: true,
                Service: true
            },
            where: {
                Period: {
                    dayOfWeek: day
                }
            }
        })
    }

    static async getServiceForAGivenDate(date: Date) {
        const day = Period.getDayOfWeek(date);
        return this.getServiceForAGivenDay(day);
    }

    static async createOneService(
        name: string,
        start_at: Date,
        end_at: Date,
        days: Days[]
    ) {
        // create service if not exists
        const service = await prisma.service.upsert(
            {
                where: {
                    name: name
                },
                update: {},
                create: {
                    name: name
                },
                select: {
                    id: true
                }
            }
        )

        const periodsArray: {
            dayOfWeek: Days,
            start_at: Date,
            end_at: Date
        }[] = days.map((day) => {
            return {
                dayOfWeek: day,
                start_at: start_at,
                end_at: end_at
            }
        })

        const ids: number[] = []
        for (const period of periodsArray) {
            const periodPrisma = await PeriodRepository.create(period.dayOfWeek, start_at, end_at)
            ids.push(periodPrisma.id)
        }

        return await prisma.servicePeriod.createMany({
            data: ids.map((id: number) => {
                return {
                    serviceId: service.id,
                    periodId: id
                }
            })
        })
    }

    static async deleteAllServices() {
        return prisma.service.deleteMany({})
    }
}