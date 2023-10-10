import {prisma} from "@root/ExpressApp";
import {
    Reservation,
    UpdateReservationPayload
} from "@root/domain/booking-calendar-management/booking/reservation/Reservation";
import {ClientRepository} from "@root/domain/client/ClientRepository";


export class ReservationRepository {

    static async deleteReserved(id: number) {
        return prisma.reserved.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                reservationId: true,
                tableId: true
            }
        })
    }


    static async getAll() {

        // get all reservations, no matter what the status is
        return prisma.reservation.findMany(
            {
                select: {
                    id: true,
                    Reserved: {
                        select: {
                            id: true,
                            Table: true
                        }
                    },
                    date: true,
                    Client: true,
                    comment: true,
                    status: true,
                    numberOfPersons: true,
                }
            }
        );

    }

    static async getAllReservationGreaterThanDate(date: Date) {
        return prisma.reservation.findMany(
            {
                where: {
                    date: {
                        gte: date
                    }
                },
                select: {
                    id: true,
                    Reserved: {
                        select: {
                            Table: true
                        }
                    },
                    date: true,
                    Client: true,
                    comment: true,
                    status: true,
                    numberOfPersons: true,
                }
            }
        );
    }

    static async getAllReservationLessThanDate(date: Date) {
        return prisma.reservation.findMany(
            {
                where: {
                    date: {
                        lte: date
                    }
                },
                select: {
                    id: true,
                    Reserved: {
                        select: {
                            Table: true
                        }
                    },
                    date: true,
                    Client: true,
                    comment: true,
                    status: true,
                    numberOfPersons: true,
                }
            }
        );
    }

    static async getAllReservationBetweenDate(date1: Date, date2: Date) {
        const [d1, d2] = Reservation.sortDates(date1, date2);
        return prisma.reservation.findMany(
            {
                where: {
                    date: {
                        gte: d1,
                        lte: d2
                    }
                },
                select: {
                    id: true,
                    Reserved: {
                        select: {
                            Table: true
                        }
                    },
                    date: true,
                    Client: true,
                    comment: true,
                    status: true,
                    numberOfPersons: true,
                }
            }
        );
    }

    static async getById(id: number) {

        // get all reservations, no matter what the status is
        return prisma.reservation.findUnique(
            {
                where: {
                    id: id
                },
                select: {
                    id: true,
                    Reserved: {
                        select: {
                            Table: true
                        }
                    },
                    date: true,
                    Client: true,
                    comment: true,
                    status: true,
                    numberOfPersons: true,
                }
            }
        );

    }

    static async getReservationByMobileNumberOrEmail({mobileNumber, email}: { mobileNumber?: string, email?: string }) {

        return prisma.reservation.findFirst(
            {
                where: {
                    OR: [
                        {
                            Client: {
                                mobileNumber: mobileNumber
                            }
                        },
                        {
                            Client: {
                                email: email
                            }
                        }
                    ]
                },
                select: {
                    id: true,
                    Reserved: {
                        select: {
                            Table: true
                        }
                    },
                    date: true,
                    Client: true,
                    comment: true,
                    status: true,
                    numberOfPersons: true,
                }
            }
        );
    }

    static async createReservation(reservation: {
        email: string,
        mobileNumber?: string,
        firstname: string,
        lastname: string,
        date: Date,
        numberOfPersons: number,
        comment?: string,
        tables: number[]
    }) {

        let client = await prisma.client.upsert({
            where: {
                email: reservation.email
            },
            create: {
                email: reservation.email,
                mobileNumber: reservation.mobileNumber,
                firstname: reservation.firstname,
                lastname: reservation.lastname,
            },
            update: {
                email: reservation.email,
                mobileNumber: reservation.mobileNumber,
                firstname: reservation.firstname,
                lastname: reservation.lastname,
            }
        })

        return prisma.reservation.create({
            data: {
                date: reservation.date,
                numberOfPersons: reservation.numberOfPersons,
                comment: reservation.comment,
                status: "Pending",
                Reserved: {
                    createMany: {
                        data: reservation.tables.map(id => ({tableId: id})) // replace "tableId" by the correct field
                    }
                },
                clientId: client.id
            },
            select: {
                id: true,
                date: true,
                comment: true,
                numberOfPersons: true,
                Reserved: {
                    select: {
                        id: true,
                        Table: {
                            select: {
                                id: true,
                                name: true,
                                capacity: true
                            }
                        }
                    }
                },
                Client: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                        mobileNumber: true,
                        _count: {
                            select: {
                                Reservation: true
                            }
                        },
                        count_no_shows: true,
                        count_reservations: true
                    }
                },
                status: true
            }
        });
    }

    static async getPendingReservations() {
        return prisma.reservation.findMany({
            where: {
                status: "Pending"
            },
            select: {
                date: true,
                comment: true,
                numberOfPersons: true,
                Reserved: {
                    select: {
                        Table: {
                            select: {
                                name: true,
                                capacity: true
                            }
                        }
                    }
                },
                Client: {
                    select: {
                        firstname: true,
                        lastname: true,
                        email: true,
                        mobileNumber: true,
                        _count: {
                            select: {
                                Reservation: true
                            }
                        },
                        count_no_shows: true,
                        count_reservations: true
                    }
                },
                status: true
            }
        })
    }

    static async getConfirmedReservations() {
        return prisma.reservation.findMany({
            where: {
                status: "Confirmed"
            },
            select: {
                date: true,
                comment: true,
                numberOfPersons: true,
                Reserved: {
                    select: {
                        Table: {
                            select: {
                                name: true,
                                capacity: true
                            }
                        }
                    }
                },
                Client: {
                    select: {
                        firstname: true,
                        lastname: true,
                        email: true,
                        mobileNumber: true,
                        _count: {
                            select: {
                                Reservation: true
                            }
                        },
                        count_no_shows: true,
                        count_reservations: true
                    }
                },
                status: true
            }
        })
    }

    static async confirmReservation(id: number) {

        const confirm = await prisma.reservation.update({
            where: {
                id
            },
            data: {
                status: "Confirmed"
            },
            select: {
                Client: true,
                date: true,
                numberOfPersons: true,
            }
        })

        await prisma.client.update(
            {
                where: {
                    id: confirm.Client.id
                },
                data: {
                    count_reservations: {
                        set: confirm.Client.count_reservations + 1
                    }
                }
            }
        )


        return confirm;
    }

    static async declineReservation(id: number) {
        return prisma.reservation.delete(
            {
                where: {
                    id: id
                }
            }
        )
    }

    static async noShowReservation(id: number) {
        // cancellation makes increment the number of no shows of the client
        const canceled = await prisma.reservation.delete(
            {
                where: {
                    id: id
                },
                select: {
                    Client: true,
                    numberOfPersons: true,
                    date: true,
                    Reserved: {
                        select: {
                            Table: {
                                select: {
                                    id: true,
                                    capacity: true,
                                    name: true,
                                }
                            }
                        }
                    },
                    comment: true
                }
            }
        )

        await prisma.client.update(
            {
                where: {
                    id: canceled.Client.id
                },
                data: {
                    count_no_shows: {
                        set: canceled.Client.count_no_shows + 1
                    }
                }
            })


        return canceled;
    }

    static async reassignTables(id: number, tables: number[]) {
        await prisma.reserved.deleteMany({
            where: {
                reservationId: id
            }
        })
        return await prisma.reserved.createMany(
            {
                data: tables.map(table => ({tableId: table, reservationId: id}))
            }
        )
    }

    static async changeDate(id: number, date: Date) {
        return prisma.reservation.update({
            where: {
                id: id
            },
            data: {
                date: date
            }
        })
    }

    static async updateReservation(id: number, reservationPayload: UpdateReservationPayload) {
        const client = await ClientRepository.updateClient(reservationPayload.Client.id, reservationPayload.Client)
        return prisma.reservation.update({
            where: {
                id: id
            },
            data: {
                date: reservationPayload.date,
                comment: reservationPayload.comment,
                numberOfPersons: reservationPayload.numberOfPersons,
                status: reservationPayload.status,
                Reserved: {
                    deleteMany: {},
                    createMany: {
                        data: reservationPayload.tables.map(table => ({tableId: table}))
                    }
                },
                clientId: client.id
            },
            select: {
                id: true,
                date: true,
                comment: true,
                numberOfPersons: true,
                Reserved: {
                    select: {
                        id: true,
                        Table: {
                            select: {
                                id: true,
                                name: true,
                                capacity: true
                            }
                        }
                    }
                },
                Client: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                        mobileNumber: true,
                        count_no_shows: true,
                        count_reservations: true
                    }
                },
                status: true
            }
        })
    }

}