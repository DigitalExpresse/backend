import {Days, Period} from "@prisma/client";

export class OpeningHours {
    public id?: number;
    public period: Period;

    static payloadFormatter(payload: {
        name: string,
        start_at: string,
        end_at: string,
        days: string []
    }[]) {
        return payload.map((openingHours) => {
            return {
                name: openingHours.name,
                start_at: new Date(openingHours.start_at),
                end_at: new Date(openingHours.end_at),
                days: openingHours.days.map(day => day as Days)
            }
        })
    }

}