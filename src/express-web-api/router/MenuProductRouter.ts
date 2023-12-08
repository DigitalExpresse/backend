import * as express from 'express';
import {MiddlewareAuthentication} from "@root/middlewares/MiddlewareAuthentication";
import {handleErrors} from "@utils/service/handleErrors";
import {
    MenuProductGetAllController
} from "@root/domain/card-menu-management/menu-product/getAll/MenuProductGetAllController";
import {SUCCESS} from "@utils/messages/successMessage";
import {
    MenuProductGetOneByIdController
} from "@root/domain/card-menu-management/menu-product/getOneById/MenuProductGetOneByIdController";
import {
    MenuProductDeleteController
} from "@root/domain/card-menu-management/menu-product/delete/MenuProductDeleteController";
import {
    MenuProductCreateController
} from "@root/domain/card-menu-management/menu-product/create/MenuProductCreateController";
import {
    MenuProductUpdateController
} from "@root/domain/card-menu-management/menu-product/update/MenuProductUpdateController";
import {
    MenuProductGetByMenuIdController
} from "@root/domain/card-menu-management/menu-product/getByMenuId/MenuProductGetByMenuIdController";

export class MenuProductRouter {

    public router: express.Router;
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {

        this.router = express.Router();

        // ---------------------------- GET ALL ----------------------------
        this.router.get("/", async (req: express.Request, res: express.Response) => {

            try {

                const menuProductGetAllController = new MenuProductGetAllController();
                const allMenuProducts = await menuProductGetAllController.execute();
                res.status(SUCCESS.status).json(allMenuProducts);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }
        });

        // ---------------------------- GET ONE ----------------------------
        this.router.get("/:id", async (req: express.Request, res: express.Response) => {

            try {

                const menuProductGetOneController = new MenuProductGetOneByIdController(req.params.id);

                const foundedMenuProduct = await menuProductGetOneController.execute();

                res.status(SUCCESS.status).json(foundedMenuProduct);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }
        });

        // ---------------------------- CREATE ----------------------------
        this.router.post("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const menuProductCreateController = new MenuProductCreateController(req.body);

                const createdMenuProduct = await menuProductCreateController.execute();

                res.status(SUCCESS.status).json(createdMenuProduct);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }
        });

        // ---------------------------- GET BY MENU ID ----------------------------
        this.router.get("/menu/:id", async (req: express.Request, res: express.Response) => {

            try {

                const menuProductGetByMenuIdController = new MenuProductGetByMenuIdController(parseInt(req.params.id));
                const allMenuProducts = await menuProductGetByMenuIdController.execute();

                res.status(SUCCESS.status).json(allMenuProducts);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }

        });

        // ---------------------------- UPDATE ----------------------------
        this.router.put("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const menuProductUpdateController = new MenuProductUpdateController({...req.body, id: req.params.id});

                const updatedMenuProduct = await menuProductUpdateController.execute();

                res.status(SUCCESS.status).json(updatedMenuProduct);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }
        });

        // ---------------------------- DELETE ----------------------------
        this.router.delete("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const menuProductDeleteController = new MenuProductDeleteController(parseInt(req.params.id));

                const deletedMenuProduct = await menuProductDeleteController.execute();

                res.status(SUCCESS.status).json(deletedMenuProduct);

            } catch (e) {

                const {status, error} = handleErrors(e);
                res.status(status).json(error);
            }
        });
    }
}