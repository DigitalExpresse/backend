import {MiddlewareAuthentication} from "@root/middlewares/MiddlewareAuthentication";
import process from "process";
import express from "express";
import {MenuCreateController} from "@root/domain/card-menu-management/menu/create/MenuCreateController";
import {
    SUCCESS,
    SUCCESS_RESOURCE_CREATED,
    SUCCESS_RESOURCE_DELETED,
    SUCCESS_RESOURCE_UPDATED
} from "@utils/messages/success_message";
import {handleErrors} from "@utils/service/handleErrors";
import {MenuUpdateController} from "@root/domain/card-menu-management/menu/update/MenuUpdateController";
import {MenuDeleteController} from "@root/domain/card-menu-management/menu/delete/MenuDeleteController";
import {MenuRepository} from "@root/domain/card-menu-management/menu/MenuRepository";
import {MenuGetOneByIdController} from "@root/domain/card-menu-management/menu/getOneById/MenuGetOneByIdController";

export class MenuRouter {

    public router: express.Router;
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {
        this.router = express.Router();

        // ---------------------------- CREATE ----------------------------
        this.router.post("/", async (req: express.Request, res: express.Response) => {

            try {

                const menuCreateController = new MenuCreateController(req.body);

                const createdMenu = await menuCreateController.createController();

                return res.status(SUCCESS_RESOURCE_CREATED.status).json(createdMenu);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }
        })

        // ---------------------------- UPDATE ----------------------------
        this.router.put("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const menuUpdateController = new MenuUpdateController({...req.body, id: req.params.id});

                const updatedMenu = await menuUpdateController.updateController();

                return res.status(SUCCESS_RESOURCE_UPDATED.status).json(updatedMenu);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);
            }

        });

        // ---------------------------- DELETE ----------------------------
        this.router.delete("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const menuDeleteController = new MenuDeleteController(req.params.id);

                await menuDeleteController.deleteController();

                return res.status(SUCCESS_RESOURCE_DELETED.status).json(SUCCESS_RESOURCE_DELETED.message);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);

            }
        });

        // ---------------------------- GET ONE ----------------------------
        this.router.get("/:id", async (req: express.Request, res: express.Response) => {

            try {

                const menuGetOneByIdController = new MenuGetOneByIdController(req.params.id);

                const menu = await menuGetOneByIdController.getOneByIdController();

                return res.status(SUCCESS.status).json(menu);

            } catch (e) {

                const {status, error} = handleErrors(e);
                return res.status(status).json(error);

            }
        });

        // ---------------------------- GET ALL ----------------------------
        this.router.get("/", async (req: express.Request, res: express.Response) => {

                try {

                    const allMenus = await MenuRepository.findAll();
                    return res.status(SUCCESS.status).json(allMenus);

                } catch (e) {

                    const {status, error} = handleErrors(e);
                    return res.status(status).json(error);

                }
        });

    }

}