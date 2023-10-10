import * as express from 'express';
import {MiddlewareAuthentication} from "@root/middlewares/MiddlewareAuthentication";
import {
    ProductSupplementCreateController
} from "@root/domain/card-menu-management/product-supplement/create/ProductSupplementCreateController";
import {
    SUCCESS,
    SUCCESS_RESOURCE_CREATED,
    SUCCESS_RESOURCE_DELETED,
    SUCCESS_RESOURCE_UPDATED
} from "@utils/messages/success_message";
import {handleErrors} from "@utils/service/handleErrors";
import {
    ProductSupplementDeleteController
} from "@root/domain/card-menu-management/product-supplement/delete/ProductSupplementDeleteController";
import {
    ProductSupplementGetByProductIdController
} from "@root/domain/card-menu-management/product-supplement/getByProductId/ProductSupplementGetByProductIdController";
import {
    ProductSupplementUpdateController
} from "@root/domain/card-menu-management/product-supplement/update/ProductSupplementUpdateController";
export class ProductSupplementRouter {

    public router: express.Router
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {

        this.router = express.Router();

        // ---------------------------- GET BY PRODUCT ID ----------------------------
        this.router.get("/product/:productId", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const productId = Number(req.params.productId);

                const productSupplementGetByProductIdController = new ProductSupplementGetByProductIdController(productId);

                await productSupplementGetByProductIdController.execute();

                res.status(SUCCESS.status).json(productSupplementGetByProductIdController._response);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }

        });

        // ---------------------------- CREATE ----------------------------
        this.router.post("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const productSupplementCreateController = new ProductSupplementCreateController(req.body);

                const createdProductSupplement = await productSupplementCreateController.execute();

                res.status(SUCCESS_RESOURCE_CREATED.status).json(createdProductSupplement);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }
        });

        // ---------------------------- DELETE ----------------------------
        this.router.delete("/:supplementId", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const supplementId = Number(req.params.supplementId);

                const productSupplementDeleteController = new ProductSupplementDeleteController(supplementId);

                await productSupplementDeleteController.execute();

                res.status(SUCCESS_RESOURCE_DELETED.status).json()

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }

        });

        // ---------------------------- UPDATE ----------------------------
        this.router.put("/:supplementId", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const supplementId = Number(req.params.supplementId);

                const productSupplementUpdateController = new ProductSupplementUpdateController({...req.body, id: supplementId});

                const updatedProductSupplement = await productSupplementUpdateController.execute();

                res.status(SUCCESS_RESOURCE_UPDATED.status).json(updatedProductSupplement);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }

        });
    }
}