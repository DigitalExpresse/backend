import {prisma} from "@root/ExpressApp";
import {Table} from "@prisma/client";
import {HolidayRepository} from "@root/domain/booking-calendar-management/calendar/holiday/HolidayRepository";
import {Reservation} from "@root/domain/booking-calendar-management/booking/reservation/Reservation";

export class TableRepository {


    // Basic CRUD operations

    static async findAll(): Promise<Table[]> {

        try {

            return await prisma.table.findMany();

        } catch (error) {

            throw new Error('Failed to find all tables: ' + error);

        }

    }

    static async findById(id: number): Promise<Table> {

        return prisma.table.findUnique({
            where: {
                id: id,
            }
        });


    }

    static async create(tableInstance: Omit<Table, "id">): Promise<Table> {

        return prisma.table.create({
            data: {
                name: tableInstance.name,
                capacity: tableInstance.capacity,
            },
        });
    }

    static async update({dataToUpdate, id}): Promise<Table> {

        return prisma.table.update({
            where: {
                id: id,
            },
            data: {
                name: dataToUpdate.name,
                capacity: dataToUpdate.capacity,
            },
        });

    }

    static async delete(id: number): Promise<Table> {

        return prisma.table.delete({
            where: {
                id: id,
            },
        });
    }


    // Specific CRUD operations

    static async getCapacity(date: Date): Promise<number> {
        const {borneInf, borneSup} = Reservation.delimitDate(date);

        if (await HolidayRepository.isHoliday(date)) {
            return 0
        }

        const aggregate = await prisma.table.aggregate({
            _sum: {
                capacity: true
            },
            where: {
                Reserved: {
                    none: {
                        Reservation: {
                            date: {
                                gt: borneInf,
                                lt: borneSup
                            }
                        }
                    }
                }
            }
        })
        return aggregate._sum.capacity;
    }

    static async getAvailableTables({date, capacity, condition}: {
        date: Date,
        capacity?: number,
        condition?: 'gte' | 'lte'
    }): Promise<{
        id: number,
        capacity: number,
        name: string
    }[]> {

        const {borneInf, borneSup} = Reservation.delimitDate(date);

        if (capacity && condition) {
            console.log("condition is specified")
            const table = await prisma.table.findMany({
                where: {
                    Reserved: {
                        none: {
                            Reservation: {
                                date: {
                                    gt: borneInf,
                                    lt: borneSup
                                }
                            }
                        }
                    },
                    capacity: {
                        [condition]: capacity
                    }
                }
            })
            return table.map(t => {
                return {
                    id: t.id,
                    capacity: t.capacity,
                    name: t.name
                }
            })
        } else {
            const table = await prisma.table.findMany({
                where: {
                    Reserved: {
                        none: {
                            Reservation: {
                                date: {
                                    gt: borneInf,
                                    lt: borneSup
                                }
                            }
                        }
                    }
                }
            });
            return table.map(t => {
                    return {
                        id: t.id,
                        capacity: t.capacity,
                        name: t.name
                    }
                }
            )
        }
    }

    static async getTableOfReservation(id: number) {
        const table = await prisma.table.findMany(
            {
                where: {
                    Reserved: {
                        some: {
                            reservationId: id
                        }
                    }
                }
            }
        )
        return table.map(t => {
            return {
                id: t.id,
                capacity: t.capacity,
                name: t.name
            }
        })
    }
}