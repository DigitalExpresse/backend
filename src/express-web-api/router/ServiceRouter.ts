import express from "express";
import {
    ServiceCreateController
} from "@root/domain/booking-calendar-management/calendar/service/create/ServiceCreateController";
import {ServiceRepository} from "@root/domain/booking-calendar-management/calendar/service/ServiceRepository";

export class ServiceRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();

        this.router.post('/update', (req, res) => {

            ServiceCreateController.createServices(req.body)
                .then((response) => {
                    res.status(200).json(response);
                })
                .catch((e) => {
                    console.log(e)
                    res.status(500).json({message: 'error', error: e.message});
                });
        })

        this.router.get('/', (req, res) => {

            ServiceRepository.getAll()
                .then((response) => {
                    res.status(200).json(response);
                })
                .catch((e) => {
                    console.log(e)
                    res.status(500).json({message: 'error', error: e.message});
                });
        })

    }
}