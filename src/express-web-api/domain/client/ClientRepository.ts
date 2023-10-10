import {Client} from "prisma/prisma-client";
import {prisma} from "@root/ExpressApp";

export class ClientRepository {

    static async create(client: {
        email: string,
        mobileNumber?: string,
        firstname: string,
        lastname: string
    }) {


        let clientFound = await prisma.client.findFirst(
            {
                where: {
                    OR: [
                        {
                            email: client.email
                        },
                        {
                            mobileNumber: client.mobileNumber
                        }
                    ]
                },
                select: {
                    id: true
                }
            }
        )

        if (clientFound === null) {
            clientFound = await prisma.client.create({
                    data: {
                        mobileNumber: client.mobileNumber,
                        email: client.email,
                        firstname: client.firstname,
                        lastname: client.lastname
                    },
                    select: {
                        id: true
                    }
                }
            )
        } else {
            await ClientRepository.addMailOrPhoneNumber(client.email, client.mobileNumber)
        }

        return clientFound;
    }

    static async addMailOrPhoneNumber(mail: string, mobileNumber: string): Promise<Client> {
        const client1 = await prisma.client.findFirst({
            where: {
                email: mail,
            }
        });
        const client2 = await prisma.client.findFirst({
            where: {
                mobileNumber: mobileNumber,
            }
        });

        // if both clients are undefined or both clients are defined and have the different id, throw an error
        if ((client1 && client2 && client1.id !== client2.id)) {
            throw new Error("The mail and mobile number are linked to different clients");
        } else if (!client1 && !client2) {
            throw new Error("Clients with this mail and mobile number do not exist");
        }

        const notNullClient = client1 ? client1 : client2;


        return prisma.client.update({
            where: {
                id: notNullClient.id,
            },
            data: {
                email: mail,
                mobileNumber: mobileNumber,
            }
        });

    }

    static async AreMailAndPhoneCompatible(email: string, mobileNumber: string): Promise<boolean> {
        // client 1 is the client with the email (unique)
        const client1 = await prisma.client.findUnique({
            where: {
                email: email,
            }
        });
        // client 2 is a list of clients with the mobile number (not unique)
        const client2 = await prisma.client.findMany({
            where: {
                mobileNumber: mobileNumber,
            }
        });

        // if client 1 do not appear in client 2, it means that the mail and the phone number are linked to different clients

        if (client1 && client2) {
            // if client
            return client2.map(client => client.id).includes(client1.id);
        } else {
            // if one of the client is undefined, it means that we can associate the mail and the phone number
            return true;
        }
    }

    static async updateClient(id: number, client: {
        email: string,
        mobileNumber?: string,
        firstname: string,
        lastname?: string
    }) {

        // check if the mail is already used by another client
        const clientFound = await prisma.client.findUnique({
            where: {
                email: client.email,
            }
        });

        // if client found and the id is different, reassign all reservations to the current client
        if (clientFound && clientFound.id !== id) {
            await prisma.reservation.updateMany({
                where: {
                    clientId: clientFound.id,
                },
                data: {
                    clientId: id,
                }
            })

            await prisma.client.delete({
                where: {
                    id: clientFound.id
                }
            })

            await prisma.client.update({
                where: {
                    id: id
                },
                data: {
                    email: client.email,
                    firstname: client.firstname,
                    lastname: client.lastname,
                    mobileNumber: client.mobileNumber,
                    count_no_shows: {
                        increment: clientFound.count_no_shows
                    },
                    count_reservations: {
                        increment: clientFound.count_reservations
                    }
                }
            })

            return prisma.client.findUnique({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    email: true,
                    firstname: true,
                    lastname: true,
                    mobileNumber: true,
                    count_reservations: true,
                    count_no_shows: true,
                }
            })
        }

        console.log("the id is : ", id)
        return prisma.client.update({
            where: {
                id: id
            },
            data: {
                email: client.email,
                firstname: client.firstname,
                lastname: client.lastname,
                mobileNumber: client.mobileNumber
            },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                mobileNumber: true,
                count_reservations: true,
                count_no_shows: true
            }
        })
    }
}