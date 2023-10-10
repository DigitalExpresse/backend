import express from "express";
import {handleErrors} from "@utils/service/handleErrors";
import {MiddlewareAuthentication} from "@root/middlewares/MiddlewareAuthentication";
import {SUCCESS, SUCCESS_RESOURCE_DELETED} from "@utils/messages/success_message";
import {
    TableGetAllController
} from "@root/domain/booking-calendar-management/booking/table/get-all/TableGetAllController";
import {
    TableGetOneController
} from "@root/domain/booking-calendar-management/booking/table/get-one/TableGetOneController";
import {
    TableCreateController
} from "@root/domain/booking-calendar-management/booking/table/create/TableCreateController";
import {
    TableUpdateController
} from "@root/domain/booking-calendar-management/booking/table/update/TableUpdateController";
import {
    TableDeleteController
} from "@root/domain/booking-calendar-management/booking/table/delete/TableDeleteController";


export class TableRouter {

    public router: express.Router;
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {

        this.router = express.Router();

        // ---------------------------- GET ALL ----------------------------
        this.router.get("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const tableGetAllController = new TableGetAllController();
                const allTables = await tableGetAllController.getAllController();

                return res.status(SUCCESS.status).json(allTables);

            } catch (e) {
                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- GET ONE ----------------------------
        this.router.get("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const tableGetOneController = new TableGetOneController(req.params.id);
                const table = await tableGetOneController.getOneController();

                return res.status(SUCCESS.status).json(table);

            } catch (e) {
                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- CREATE ----------------------------
        this.router.post("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const tableCreateController = new TableCreateController(req.body);
                const newTable = await tableCreateController.createController();

                return res.status(SUCCESS.status).json(newTable);

            } catch (e) {
                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });


        // ---------------------------- UPDATE ----------------------------
        this.router.put("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const reqData = {...req.body, id: req.params.id}
                const tableUpdateController = new TableUpdateController(reqData);
                const updatedTable = await tableUpdateController.updateController();

                return res.status(SUCCESS.status).json(updatedTable);

            } catch (e) {
                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });


        // ---------------------------- DELETE ----------------------------
        this.router.delete("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const id = parseInt(req.params.id);
                const tableDeleteController = new TableDeleteController(id);
                await tableDeleteController.deleteController();

                return res.status(SUCCESS_RESOURCE_DELETED.status).json();

            } catch (e) {
                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }


        });

    }

}
