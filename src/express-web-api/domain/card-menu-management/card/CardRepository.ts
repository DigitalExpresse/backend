import {Card} from "@prisma/client";
import {prisma} from "@root/ExpressApp";

export class CardRepository {

    static create(card: Card): Promise<Card> {

        const newCard = prisma.card.create({
            data: {
                name: card.name,
                description: card.description,
            }
        });

        return newCard;

    }

    static async findById(id: number): Promise<Card | null> {
        const card = await prisma.card.findUnique({
            where: {
                id: id
            }
        });
        return card;
    }

    static async findAll(): Promise<Card[]> {
        const cards = await prisma.card.findMany();
        return cards;
    }

    static async update({dataToUpdate, id}): Promise<Card> {

        const updatedCard = await prisma.card.update({
            where: {
                id: Number(id)
            },
            data: dataToUpdate
        });
        return updatedCard;
    }

    static async delete(id: number): Promise<Card> {
        const deletedCard = await prisma.card.delete({
            where: {
                id: id
            }
        });
        return deletedCard;
    }
}