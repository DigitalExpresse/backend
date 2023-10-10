import {prisma} from "@root/ExpressApp";
import {Days} from "@prisma/client";
import {PeriodRepository} from "@root/domain/booking-calendar-management/calendar/period/PeriodRepository";

export class OpeningHoursRepository {

    static async getAll(): Promise<{
        name: string,
        start_at: Date,
        end_at: Date,
        days: Days[]
    }[]> {
        const openingHours = await prisma.openingHours.findMany(
            {
                select: {
                    name: true,
                    OpeningHours: {
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
        return openingHours.map(openingHour => {
            const hasPeriods = openingHour.OpeningHours && openingHour.OpeningHours.length > 0;
            return {
                name: openingHour.name,
                start_at: hasPeriods ? openingHour.OpeningHours[0].Period.start_at : null,
                end_at: hasPeriods ? openingHour.OpeningHours[0].Period.end_at : null,
                days: hasPeriods ? openingHour.OpeningHours.map(openingHourPeriod => openingHourPeriod.Period.dayOfWeek) : []
            }
        })
    }

    static async createOneOpeningHours(
        name: string,
        start_at: Date,
        end_at: Date,
        days: Days[]
    ) {
        // create the group of opening hours if not exist
        const openingHoursGroup = await prisma.openingHours.upsert(
            {
                where: {
                    name: name
                },
                update: {},
                create: {name: name},
                select: {
                    id: true,
                    name: true
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

        return await prisma.openingHour.createMany({
            data: ids.map((id: number) => {
                    return {
                        groupId: openingHoursGroup.id,
                        periodId: id
                    }
                }
            )
        })
    }

    static async deleteAllOpeningHours() {
        return prisma.openingHours.deleteMany({})
    }

}