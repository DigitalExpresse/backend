import express from "express";
import {
    HolidayCreateController
} from "@root/domain/booking-calendar-management/calendar/holiday/create/HolidayCreateController";
import {HolidayGetController} from "@root/domain/booking-calendar-management/calendar/holiday/get/HolidayGetController";

export class HolidayRouter {
    public router: express.Router;

    constructor() {

        this.router = express.Router();

        this.router.post('/update', (req, res) => {
            try {
                const result = HolidayCreateController.updateHoliday(req.body);
                return res.status(200).json(result);
            } catch (e) {
                return res.status(500).json({message: 'error', error: e.message});
            }
        })

        this.router.get('/', async (req, res) => {
            try {
                const holidays = await HolidayGetController.getHolidays()
                return res.status(200).json(holidays);
            } catch (e) {
                return res.status(500).json({message: 'error', error: e.message});
            }
        })

    }
}