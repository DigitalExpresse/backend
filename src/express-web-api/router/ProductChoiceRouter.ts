import * as express from 'express';
import {MiddlewareAuthentication} from "@root/middlewares/MiddlewareAuthentication";
import process from "process";
import {handleErrors} from "@utils/service/handleErrors";
import {
    ProductChoiceCreateController
} from "@root/domain/card-menu-management/product-choice/create/ProductChoiceCreateController";
import {
    SUCCESS_RESOURCE_CREATED,
    SUCCESS_RESOURCE_DELETED,
    SUCCESS_RESOURCE_UPDATED
} from "@utils/messages/success_message";
import {
    ProductChoiceDeleteController
} from "@root/domain/card-menu-management/product-choice/delete/ProductChoiceDeleteController";
import {
    ProductChoiceUpdateController
} from "@root/domain/card-menu-management/product-choice/update/ProductChoiceUpdateController";
import {
    OptionChoiceProductUpdateController
} from "@root/domain/card-menu-management/option-choice/update/OptionChoiceProductUpdateController";
import {
    ProductChoiceGetByProductIdController
} from "@root/domain/card-menu-management/product-choice/getByProductId/ProductChoiceGetByProductIdController";

export class ProductChoiceRouter {

    public router: express.Router;
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {

        this.router = express.Router();

        // ---------------------------- CREATE ----------------------------
        this.router.post("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const productChoiceCreateController = new ProductChoiceCreateController(req.body);

                const createdProductChoice = await productChoiceCreateController.execute();

                return res.status(SUCCESS_RESOURCE_CREATED.status).json(createdProductChoice);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- DELETE ----------------------------
        this.router.delete("/:choiceTypeId", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const productChoiceDeleteController = new ProductChoiceDeleteController(req.params.choiceTypeId)
                await productChoiceDeleteController.execute()

                res.status(SUCCESS_RESOURCE_DELETED.status).json()

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }
        });

        // ---------------------------- UPDATE CHOICE TYPE----------------------------
        this.router.put("/:choiceTypeId", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const productChoiceUpdateController = new ProductChoiceUpdateController({
                    ...req.body,
                    choiceTypeId: req.params.choiceTypeId
                })
                const updatedProductChoice = await productChoiceUpdateController.execute()

                res.status(SUCCESS_RESOURCE_UPDATED.status).json(updatedProductChoice)

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }
        });

        // ---------------------------- UPDATE OPTION CHOICE ----------------------------
        this.router.put("/option/:optionId", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const optionChoiceProductUpdateController = new OptionChoiceProductUpdateController({
                    ...req.body, optionId: req.params.optionId
                })

                const updatedOptionChoiceProduct = await optionChoiceProductUpdateController.execute()

                res.status(SUCCESS_RESOURCE_UPDATED.status).json(updatedOptionChoiceProduct)

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);

            }

        });

        // ---------------------------- GET PRODUCT CHOICE BY PRODUCT ID ----------------------------
        this.router.get("/product/:productId", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const productChoiceGetByProductIdController = new ProductChoiceGetByProductIdController(parseInt(req.params.productId))
                const foundProductChoiceAndOption = await productChoiceGetByProductIdController.execute()

                res.status(200).json(foundProductChoiceAndOption)

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);

            }

        });

    }

}