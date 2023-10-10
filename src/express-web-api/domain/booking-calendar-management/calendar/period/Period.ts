import {Days} from "@prisma/client";

export class Period {
    public id?: number;
    public start_at: Date;
    public end_at: Date;
    public dayOfWeek: string; // can only be one of the enum values

    constructor(id: number, start_at: Date, end_at: Date, dayOfWeek: string) {
        this.id = id;
        this.start_at = start_at;
        this.end_at = end_at;
        this.dayOfWeek = dayOfWeek;
    }

    static getDayOfWeek(date: Date): Days {
        const daysArray: Days[] = [Days.Sunday, Days.Monday, Days.Tuesday, Days.Wednesday, Days.Thursday, Days.Friday, Days.Saturday];
        return daysArray[date.getDay()];
    }

}