import * as process from "process";

import express from "express";

import {
    SUCCESS,
    SUCCESS_CONNECTION,
    SUCCESS_RESOURCE_CREATED,
    SUCCESS_RESOURCE_DELETED,
    SUCCESS_RESOURCE_UPDATED
} from "@utils/messages/successMessage";

import { handleErrors } from "@utils/service/handleErrors";
import { AdminRegistrationController } from "@root/domain/admin/registration/AdminRegistrationController";
import { AdminConnectionController } from "@root/domain/admin/connection/AdminConnectionController";
import { AdminUpdateController } from "@root/domain/admin/update/AdminUpdateController";
import { MiddlewareAuthentication } from "../middlewares/MiddlewareAuthentication";
import {AdminDeleteAccountController} from "@root/domain/admin/delete-account/AdminDeleteAccountController";
import {Token} from "@root/domain/shared";
import {AdminGetAllController} from "@root/domain/admin/get-all/AdminGetAllController";
import {AdminGetOneController} from "@root/domain/admin/get-one/AdminGetOneController";
import {AdminDisconnectService} from "@root/domain/admin/disconnect/AdminDisconnectService";
import {AdminUpdatePasswordController} from "@root/domain/admin/updatePassword/AdminUpdatePasswordController";

export class AdminRouter {

    public router: express.Router;
    private middlewareAuthentication = MiddlewareAuthentication.authenticate.bind(null, process.env.JWT_ACCESS_ADMIN_SECRET);

    constructor() {
        this.router = express.Router();

        // ---------------------------- GET ALL ----------------------------
        this.router.get("/", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

                try {

                    const adminGetAllController = new AdminGetAllController();
                    const allAdmins = await adminGetAllController.getAllController();

                    res.status(SUCCESS.status).json(allAdmins);

                } catch (e) {
                    console.log(e)
                    const { status, error } = handleErrors(e);
                    res.status(status).json(error);
                }

        });

        // ---------------------------- GET ONE ----------------------------
        this.router.get("/:id", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

                try {

                    const adminGetOneController = new AdminGetOneController(parseInt(req.params.id));

                    const foundedAdmin = await adminGetOneController.getOneController();

                    res.status(SUCCESS.status).json(foundedAdmin);

                } catch (e) {

                    const { status, error } = handleErrors(e);
                    res.status(status).json(error);

                }

        });

        // ---------------------------- REGISTER ----------------------------
        this.router.post("/register", async (req: express.Request, res: express.Response) => {

            try {

                const adminRegistrationController = new AdminRegistrationController(req.body);
                const { new_admin_without_password, access_token, refresh_token } = await adminRegistrationController.registerController();

                res.cookie('accessToken', access_token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });
                res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: true, maxAge: 600 * 60 * 1000 });

                res.status(SUCCESS_RESOURCE_CREATED.status).json(new_admin_without_password);

            } catch (e) {
                const { status, error } = handleErrors(e);
                res.status(status).json(error);
            }

        });

        // ---------------------------- CONNECTION ----------------------------
        this.router.post("/connection", async (req: express.Request, res: express.Response) => {
            try {

                const adminConnectionController = new AdminConnectionController(req.body);
                const { admin, access_token, refresh_token } = await adminConnectionController.connectionController();

                res.cookie('accessToken', access_token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });
                res.cookie('refreshToken', refresh_token, { httpOnly: true, secure: true, maxAge: 600 * 60 * 1000 });

                res.status(SUCCESS_CONNECTION.status).json(admin);

            } catch (e) {
                const { status, error } = handleErrors(e);
                res.status(status).json(error);
            }
        });

        // ---------------------------- DISCONNECT ----------------------------

        this.router.post("/disconnect", this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                await AdminDisconnectService.disconnectAdmin(res);

                res.status(SUCCESS.status).json();

            } catch (e) {
                const { status, error } = handleErrors(e);
                res.status(status).json(error);
            }

        });

        // ---------------------------- UPDATE ----------------------------
        this.router.put('/:id', this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            const requestData = { ...req.body, ...req.params };

            try {

                const adminUpdateController = new AdminUpdateController(requestData);
                const { admin_without_password } = await adminUpdateController.updateController();

                res.status(SUCCESS_RESOURCE_UPDATED.status).json(admin_without_password);

            } catch (e) {
                const { status, error } = handleErrors(e);
                res.status(status).json(error);
            }
        });

        // ---------------------------- UPDATE PASSWORD ----------------------------
        this.router.put('/password/:id', this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

                const requestData = { ...req.body, ...req.params };

                try {

                    const adminUpdatePasswordController = new AdminUpdatePasswordController(requestData);

                    const updatedPassword = await adminUpdatePasswordController.updatePasswordController();

                    res.status(SUCCESS_RESOURCE_UPDATED.status).json(updatedPassword);

                } catch (e) {
                    const { status, error } = handleErrors(e);
                    res.status(status).json(error);
                }
        });

        // ---------------------------- DELETE ----------------------------
        this.router.delete('/:id', this.middlewareAuthentication, async (req: express.Request, res: express.Response) => {

            try {

                const adminDeleteController = new AdminDeleteAccountController(req.params.id);
                await adminDeleteController.deleteAccountController();

                res.status(SUCCESS_RESOURCE_DELETED.status).json()

            } catch (e) {
                console.log(e)
                const { status, error } = handleErrors(e);
                res.status(status).json(error);
            }

        });

        // ---------------------------- REFRESH TOKEN ----------------------------
        this.router.post("/refresh-token", async (req: express.Request, res: express.Response) => {

            try {

                const {newAccessToken, newRefreshToken} = await Token.generateAccessRefreshTokenFromRefreshToken(req.cookies.refreshToken, process.env.JWT_ACCESS_ADMIN_SECRET, process.env.JWT_REFRESH_ADMIN_SECRET);

                res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, maxAge: 600 * 60 * 1000 });


                res.status(SUCCESS_CONNECTION.status).json();

            } catch (e) {
                const { status, error } = handleErrors(e);
                res.status(status).json({ error });
            }

        });

    }

}