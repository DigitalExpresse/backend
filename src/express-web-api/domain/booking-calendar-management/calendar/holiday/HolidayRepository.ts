import {prisma} from "@root/ExpressApp";

export class HolidayRepository {

    static async createOneHoliday(name: string, startDate: Date, endDate: Date) {
        return await prisma.holiday.create({
            data: {
                name: name,
                endDate: endDate,
                startDate: startDate
            }
        });
    }

    static async createManyHolidays(holidays: { name: string, startDate: Date, endDate: Date }[]) {
        return await prisma.holiday.createMany({
            data: holidays
        });
    }

    static async deleteAllHolidays() {
        return await prisma.holiday.deleteMany({});
    }

    static async getHolidays(): Promise<{ id: number, name: string, startDate: Date, endDate: Date }[]> {
        console.log('getHolidays')
        const response = await prisma.holiday.findMany({
            select: {
                id: true,
                name: true,
                startDate: true,
                endDate: true
            }
        })
        console.log('response', response)
        return response;
    }

    static async isHoliday(date: Date) {

        const holidays = await prisma.holiday.findMany({
            where: {
                endDate: {
                    gt: date
                },
                startDate: {
                    lt: date
                }
            },
            select: {
                id: true,
                name: true,
                startDate: true,
                endDate: true
            }
        });
        return holidays.length > 0;
    }
}