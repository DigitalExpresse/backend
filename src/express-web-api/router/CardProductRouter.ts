import * as express from 'express';
import {MiddlewareAuthentication} from "@root/middlewares/MiddlewareAuthentication";
import {handleErrors} from "@utils/service/handleErrors";
import {
    CardProductGetAllController
} from "@root/domain/card-menu-management/card-product/getAll/CardProductGetAllController";
import {SUCCESS, SUCCESS_RESOURCE_DELETED} from "@utils/messages/success_message";
import {
    CardProductGetOneByIdController
} from "@root/domain/card-menu-management/card-product/getOneById/CardProductGetOneByIdController";
import {
    CardProductDeleteController
} from "@root/domain/card-menu-management/card-product/delete/CardProductDeleteController";
import {
    CardProductUpdateController
} from "@root/domain/card-menu-management/card-product/update/CardProductUpdateController";
import {
    CardProductCreateController
} from "@root/domain/card-menu-management/card-product/create/CardProductCreateController";
import {
    CardProductGetByCardIdController
} from "@root/domain/card-menu-management/card-product/getByCardId/CardProductGetByCardIdController";
export class CardProductRouter {

    public router: express.Router;
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {

            this.router = express.Router();

            // ---------------------------- GET ALL ----------------------------
            this.router.get("/", async (req: express.Request, res: express.Response) => {

                try {

                    const cardProductGetAllController = new CardProductGetAllController();
                    const allCardProducts = await cardProductGetAllController.execute();

                    res.status(SUCCESS.status).json(allCardProducts);

                } catch (e) {

                    const {status, error} = handleErrors(e);
                    res.status(status).json(error);
                }
            });

            // ---------------------------- GET ONE ----------------------------
            this.router.get("/:id", async (req: express.Request, res: express.Response) => {

                try {

                    const cardProductGetOneController = new CardProductGetOneByIdController(req.params.id);

                    const foundedCardProduct = await cardProductGetOneController.execute();

                    res.status(SUCCESS.status).json(foundedCardProduct);

                } catch (e) {

                    const {status, error} = handleErrors(e);
                    res.status(status).json(error);
                }
            });

            // ---------------------------- GET BY CARD ID ----------------------------
            this.router.get("/card/:cardId", async (req: express.Request, res: express.Response) => {

                try {

                    const cardProductGetByCardIdController = new CardProductGetByCardIdController(parseInt(req.params.cardId));

                    const foundedCardProduct = await cardProductGetByCardIdController.execute();

                    res.status(SUCCESS.status).json(foundedCardProduct);

                } catch (e) {
                    const {status, error} = handleErrors(e);
                    res.status(status).json(error);
                }
            });

            // ---------------------------- CREATE ----------------------------
            this.router.post("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

                try {

                    const cardProductCreateController = new CardProductCreateController(req.body);

                    const createdCardProduct = await cardProductCreateController.execute();

                    res.status(SUCCESS.status).json(createdCardProduct);

                } catch (e) {

                    const {status, error} = handleErrors(e);
                    res.status(status).json(error);
                }
            });

            // ---------------------------- UPDATE ----------------------------
            this.router.put("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

                try {

                    const cardProductUpdateController = new CardProductUpdateController({...req.body, id: req.params.id});

                    const updatedCardProduct = await cardProductUpdateController.execute();

                    res.status(SUCCESS.status).json(updatedCardProduct);

                } catch (e) {

                    const {status, error} = handleErrors(e);
                    res.status(status).json(error);
                }
            });

            // ---------------------------- DELETE ----------------------------
            this.router.delete("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

                    try {

                        const cardProductDeleteController = new CardProductDeleteController(parseInt(req.params.id));

                        const deletedCardProduct = await cardProductDeleteController.execute();

                        res.status(SUCCESS_RESOURCE_DELETED.status).json(deletedCardProduct);

                    } catch (e) {

                        const {status, error} = handleErrors(e);
                        res.status(status).json(error);
                    }
            });
    }
}