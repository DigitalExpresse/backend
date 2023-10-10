import {MiddlewareAuthentication} from "@root/middlewares/MiddlewareAuthentication";
import express from "express";
import {handleErrors} from "@utils/service/handleErrors";
import {
    SUCCESS,
    SUCCESS_RESOURCE_CREATED,
    SUCCESS_RESOURCE_DELETED,
    SUCCESS_RESOURCE_UPDATED
} from "@utils/messages/success_message";
import {ProductCreateController} from "@root/domain/card-menu-management/product/create/ProductCreateController";
import {ProductGetAllController} from "@root/domain/card-menu-management/product/getAll/ProductGetAllController";
import {
    ProductGetOneByIdController
} from "@root/domain/card-menu-management/product/getOneById/ProductGetOneByIdController";
import {ProductDeleteController} from "@root/domain/card-menu-management/product/delete/ProductDeleteController";
import {ProductUpdateController} from "@root/domain/card-menu-management/product/update/ProductUpdateController";
export class ProductRouter {

    public router: express.Router;
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {

        this.router = express.Router();

        // ---------------------------- CREATE ----------------------------
        this.router.post("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const productCreateController = new ProductCreateController(req.body);

                const createdProduct = await productCreateController.execute();

                return res.status(SUCCESS_RESOURCE_CREATED.status).json(createdProduct);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }
        });

        // ---------------------------- UPDATE ----------------------------
        this.router.put("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const productUpdateController = new ProductUpdateController({...req.body, id: req.params.id});

                const updatedProduct = await productUpdateController.execute();

                return res.status(SUCCESS_RESOURCE_UPDATED.status).json(updatedProduct);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- DELETE ----------------------------
        this.router.delete("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const productDeleteController = new ProductDeleteController(req.params.id);

                const deletedProduct = await productDeleteController.execute();

                return res.status(SUCCESS_RESOURCE_DELETED.status).json(deletedProduct);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- GET ONE BY ID ----------------------------
        this.router.get("/:id", async (req: express.Request, res: express.Response) => {

            try {

                const productGetOneByIdController = new ProductGetOneByIdController(req.params.id);

                const product = await productGetOneByIdController.execute();

                return res.status(SUCCESS.status).json(product);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- GET ALL ----------------------------
        this.router.get("/", async (req: express.Request, res: express.Response) => {

            try {

                const productGetAllController = new ProductGetAllController();

                const products = await productGetAllController.execute();

                return res.status(SUCCESS.status).json(products);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

    }


}