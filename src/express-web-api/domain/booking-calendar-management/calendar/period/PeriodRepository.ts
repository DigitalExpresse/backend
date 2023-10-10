import {prisma} from "@root/ExpressApp";
import {Days} from "@prisma/client";

// Days is an enum in the database (Monday, Tuesday, etc.)

export class PeriodRepository {

    static async create(dayOfWeek: Days, start_at: Date, end_at: Date) {
        return prisma.period.upsert({
            where: {
                dayOfWeek_end_at_start_at: {
                    dayOfWeek: dayOfWeek,
                    end_at: end_at,
                    start_at: start_at
                }
            },
            create: {
                dayOfWeek: dayOfWeek,
                end_at: end_at,
                start_at: start_at
            },
            update: {},
            select: {
                id: true,
                dayOfWeek: true,
                start_at: true,
                end_at: true,
            }
        })
    }


}