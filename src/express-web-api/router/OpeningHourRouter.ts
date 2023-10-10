import express from "express";
import {
    OpeningHoursCreateController
} from "@root/domain/booking-calendar-management/calendar/openingHours/create/OpeningHoursCreateController";
import {
    OpeningHoursRepository
} from "@root/domain/booking-calendar-management/calendar/openingHours/OpeningHoursRepository";

export class OpeningHourRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();

        this.router.post('/update', (req, res) => {

            OpeningHoursCreateController.createOpeningHours(req.body)
                .then((response) => {
                    res.status(200).json(response);
                })
                .catch((e) => {
                    console.log(e)
                    res.status(500).json({message: 'error', error: e.message});
                });

        })

        this.router.get('/', (req, res) => {
            OpeningHoursRepository.getAll()
                .then((response) => {
                    res.status(200).json(response);
                })
                .catch((e) => {
                        console.log(e)
                        res.status(500).json({message: 'error', error: e.message});
                    }
                );
        })

    }
}