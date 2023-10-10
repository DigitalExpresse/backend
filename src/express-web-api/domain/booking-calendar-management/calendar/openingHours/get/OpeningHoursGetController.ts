import {
    OpeningHoursRepository
} from "@root/domain/booking-calendar-management/calendar/openingHours/OpeningHoursRepository";

export class OpeningHoursGetController {

    static getOpeningHours() {
        return OpeningHoursRepository.getAll()
    }

}