import express from "express";
import {
    BookingGetController as GetController
} from "@root/domain/booking-calendar-management/booking/reservation/get/BookingGetController";
import {
    BookingHandlerController as BookController
} from "@root/domain/booking-calendar-management/booking/reservation/handler/BookingHandlerController";
import {ServiceGetController} from "@root/domain/booking-calendar-management/calendar/service/get/ServiceGetController";
import {TableRepository} from "@root/domain/booking-calendar-management/booking/table/TableRepository";
import {
    ReservationRepository
} from "@root/domain/booking-calendar-management/booking/reservation/ReservationRepository";


export class ReservationRouter {
    public router: express.Router;

    constructor() {

        this.router = express.Router();

        this.router.get('/', async (req, res) => {
            try {
                const reservations = await GetController.getAllReservations(req.body);
                return res.status(200).json(reservations);
            } catch (e) {
                return res.status(500).json({message: 'error: ' + e});
            }
        });

        this.router.get('/capacity', async (req, res) => {
            try {

                const strDate = req.body.date;
                const date = new Date(strDate);

                return res.status(200).json(await GetController.getCapacityOfDate(date));
            } catch (e) {
                return res.status(500).json({message: 'error: ' + e});
            }
        })

        this.router.post('/availability', async (req, res) => {
            try {
                const date: Date = new Date(req.body.date);
                const numberOfPeople = parseInt(req.body.numberOfPeople);
                const availabilities: {
                    name: string,
                    dates: Date[]
                }[] = await ServiceGetController.getAvailableTimes(date, numberOfPeople);
                return res.status(200).json(availabilities);
            } catch (e) {
                return res.status(500).json({message: 'error: ' + e});
            }
        })

        this.router.get('/pending', async (req, res) => {
            try {
                const pendingReservations = await GetController.getPendingReservations();
                return res.status(200).json(pendingReservations);
            } catch (e) {
                return res.status(500).json({message: 'error: ' + e});
            }
        })

        this.router.get('/confirmed', async (req, res) => {
            try {
                const confirmedReservations = await GetController.getConfirmedReservations();
                return res.status(200).json(confirmedReservations);
            } catch (e) {
                return res.status(500).json({message: 'error: ' + e});
            }
        })

        this.router.post('/create_reservation', async (req, res) => {
            try {
                const response = await BookController.bookReservation(req.body);
                return res.status(200).json(response);

            } catch (e) {
                console.log(e)
                return res.status(500).json({message: 'error', error: e.message});
            }
        })

        this.router.post('/decision_reservation', async (req, res) => {
            try {
                const reservationId: number = req.body.reservationId;
                const decision: boolean = req.body.decision;
                const response = await BookController.decisionReservation(reservationId, decision);
                return res.status(200).json(response);

            } catch (e) {
                console.log(e)
                return res.status(500).json({message: 'error', error: e.message});
            }
        })

        this.router.post('/no_show', async (req, res) => {
            try {
                const response = await BookController.noShowReservation(req.body.reservationId);
                return res.status(200).json(response);
            } catch (e) {
                console.log(e)
                return res.status(500).json({message: 'error', error: e.message});
            }

        })

        this.router.get('/:id/available_tables', async (req, res) => {
            try {
                const reservationId: number = parseInt(req.params.id);
                const response = await GetController.getAvailableTablesForRebooking(reservationId);
                return res.status(200).json(response);
            } catch (e) {
                console.log(e)
                return res.status(500).json({message: 'error', error: e.message});
            }
        })

        // TODO: change post to put
        this.router.post('/:id/reassign_table', async (req, res) => {
            try {
                const reservationId: number = parseInt(req.params.id);
                const tables: number[] = req.body.tables;
                const response = await BookController.reassignTables(reservationId, tables);
                return res.status(200).json(response);
            } catch (e) {
                console.log(e)
                return res.status(500).json({message: 'error', error: e.message});
            }
        })

        // TODO: change post to put
        this.router.post('/:id/change_date', async (req, res) => {
                try {
                    const reservationId: number = parseInt(req.params.id);
                    const date: Date = new Date(req.body.date);
                    const response = await BookController.changeDate(reservationId, date);
                    return res.status(200).json(response);
                } catch (e) {
                    console.log(e)
                    return res.status(500).json({message: 'error', error: e.message});
                }
            }
        )

        // update full reservation (infos, tables, client)
        this.router.put('/:id', async (req, res) => {
            try {
                const reservationId: number = parseInt(req.params.id);
                const response = await BookController.updateReservation(reservationId, req.body);
                return res.status(200).json(response);
            } catch (e) {
                console.log(e)
                return res.status(500).json({message: 'error', error: e.message});
            }
        })

        this.router.get('/available_tables/:date', async (req, res) => {
            try {
                const date = new Date(req.params.date);
                const tables = await TableRepository.getAvailableTables({date});
                return res.status(200).json(tables);
            } catch (e) {
                console.log(e)
                return res.status(500).json({message: 'error', error: e.message});
            }
        })

        this.router.post('/delete_reserved', async (req, res) => {
            try {
                const reservationId: number = req.body.reservedId;
                const response = await ReservationRepository.deleteReserved(reservationId);
                return res.status(200).json(response);
            } catch (e) {
                console.log(e)
                return res.status(500).json({message: 'error', error: e.message});
            }
        })
    }
}
