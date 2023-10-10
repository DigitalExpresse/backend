import {MiddlewareAuthentication} from "@root/middlewares/MiddlewareAuthentication";
import express from "express";
import {handleErrors} from "@utils/service/handleErrors";
import {CategoryCreateController} from "@root/domain/card-menu-management/category/create/CategoryCreateController";
import {
    SUCCESS,
    SUCCESS_RESOURCE_CREATED,
    SUCCESS_RESOURCE_DELETED,
    SUCCESS_RESOURCE_UPDATED
} from "@utils/messages/success_message";
import {CategoryUpdateController} from "@root/domain/card-menu-management/category/update/CategoryUpdateController";
import {CategoryDeleteController} from "@root/domain/card-menu-management/category/delete/CategoryDeleteController";
import {
    CategoryGetOneByIdController
} from "@root/domain/card-menu-management/category/getOneById/CategoryGetOneByIdController";
import {CategoryGetAllController} from "@root/domain/card-menu-management/category/getAll/CategoryGetAllController";
import {
    CategoryGetByCardIdController
} from "@root/domain/card-menu-management/category/getByCartId/CategoryGetByCardIdController";
import {
    CategoryGetByMenuIdController
} from "@root/domain/card-menu-management/category/getByMenuId/CategoryGetByMenuIdController";

export class CategoryRouter {

    public router: express.Router;
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {
        this.router = express.Router();

        // ---------------------------- CREATE ----------------------------
        this.router.post("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const categoryCreateController = new CategoryCreateController(req.body);

                const createdCategory = await categoryCreateController.execute();

                return res.status(SUCCESS_RESOURCE_CREATED.status).json(createdCategory);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }
        });

        // ---------------------------- UPDATE ----------------------------
        this.router.put("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const categoryUpdateController = new CategoryUpdateController({...req.body, id: req.params.id});

                const updatedCategory = await categoryUpdateController.updateController();

                return res.status(SUCCESS_RESOURCE_UPDATED.status).json(updatedCategory);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- DELETE ----------------------------
        this.router.delete("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const categoryDeleteController = new CategoryDeleteController(req.params.id);

                await categoryDeleteController.deleteController();

                return res.status(SUCCESS_RESOURCE_DELETED.status).json(SUCCESS_RESOURCE_DELETED);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- GET ONE BY ID ----------------------------
        this.router.get("/:id", async (req: express.Request, res: express.Response) => {

            try {

                const categoryGetOneByIdController = new CategoryGetOneByIdController(req.params.id);

                const category = await categoryGetOneByIdController.getOneByIdController();

                return res.status(SUCCESS.status).json(category);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- GET ALL ----------------------------
        this.router.get("/", async (req: express.Request, res: express.Response) => {

            try {

                const categoryGetAllController = new CategoryGetAllController();

                const categories = await categoryGetAllController.getAllController();

                return res.status(SUCCESS.status).json(categories);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- GET ALL BY MENU ID ----------------------------
        this.router.get("/card/:id", async (req: express.Request, res: express.Response) => {

            try {

                const categoryGetByCardIdController = new CategoryGetByCardIdController(parseInt(req.params.id));

                const categories = await categoryGetByCardIdController.execute();

                return res.status(SUCCESS.status).json(categories);

            }

            catch (e) {

                    const {status, error} = handleErrors(e);
                    return res.status(status).json(error);
            }

        });

        // ---------------------------- GET ALL BY MENU ID ----------------------------
        this.router.get("/menu/:id", async (req: express.Request, res: express.Response) => {

                try {

                    const categoryGetByMenuIdController = new CategoryGetByMenuIdController(parseInt(req.params.id));

                    const categories = await categoryGetByMenuIdController.execute();

                    return res.status(SUCCESS.status).json(categories);

                }

                catch (e) {

                        const {status, error} = handleErrors(e);
                        return res.status(status).json(error);
                }

        });
    }
}