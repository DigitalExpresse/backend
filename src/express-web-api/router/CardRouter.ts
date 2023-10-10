import * as express from 'express';
import {MiddlewareAuthentication} from "@root/middlewares/MiddlewareAuthentication";
import {SUCCESS} from "@utils/messages/success_message";
import {handleErrors} from "@utils/service/handleErrors";

import {CardGetAllController} from "@root/domain/card-menu-management/card/getAll/CardGetAllController";
import {CardGetOneByIdController} from "@root/domain/card-menu-management/card/getOneById/CardGetOneByIdController";
import {CardCreateController} from "@root/domain/card-menu-management/card/create/CardCreateController";
import {CardUpdateController} from "@root/domain/card-menu-management/card/update/CardUpdateController";
import {CardDeleteController} from "@root/domain/card-menu-management/card/delete/CardDeleteController";

export class CardRouter {

    public router: express.Router;
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {
        this.router = express.Router();

        // ---------------------------- GET ALL ----------------------------
        this.router.get("/", async (req: express.Request, res: express.Response) => {

            try {

                const cardGetAllController = new CardGetAllController();
                const allCards = await cardGetAllController.getAllController();

                res.status(SUCCESS.status).json(allCards);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }
        });

        // ---------------------------- GET ONE ----------------------------
        this.router.get("/:id", async (req: express.Request, res: express.Response) => {

            try {

                const cardGetOneController = new CardGetOneByIdController(req.params.id);

                const foundedCard = await cardGetOneController.getOneByIdController();

                res.status(SUCCESS.status).json(foundedCard);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }
        });

        // ---------------------------- CREATE ----------------------------
        this.router.post("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const cardCreateController = new CardCreateController(req.body);

                const createdCard = await cardCreateController.createController();

                res.status(SUCCESS.status).json(createdCard);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);

            }

        });

        // ---------------------------- UPDATE ----------------------------
        this.router.put("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const cardUpdateController = new CardUpdateController({...req.body, id: req.params.id});

                const updatedCard = await cardUpdateController.updateController();

                res.status(SUCCESS.status).json(updatedCard);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);

            }
        });

        // ---------------------------- DELETE ----------------------------
        this.router.delete("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const cardDeleteController = new CardDeleteController(req.params.id);

                const deletedCard = await cardDeleteController.deleteController();

                res.status(SUCCESS.status).json(deletedCard);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);

            }
        });
    }

}