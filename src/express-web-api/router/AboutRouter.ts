import express from "express";

import {
    SUCCESS_CONNECTION,
    SUCCESS_RESOURCE_CREATED, SUCCESS_RESOURCE_UPDATED,
} from "@utils/messages/successMessage";

import { handleErrors } from "@utils/service/handleErrors";
import { AboutCreateController } from "@root/domain/about/create/AboutCreateController";
import { AboutUpdateController } from "@root/domain/about/update/AboutUpdateController";
import { AboutGetAllController } from "@root/domain/about/get-all/AboutGetAllController";
import { AboutGetOneController } from "@root/domain/about/get-one/AboutGetOneController";


export class AboutRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();

        // ---------------------------- CREATE ----------------------------

        this.router.post("/create", async (req: express.Request, res: express.Response) => {

            try {

                const aboutCreateController = new AboutCreateController(req.body);
                const { new_about } = await aboutCreateController.createController();

                res.status(SUCCESS_RESOURCE_CREATED.status).json(new_about);

            } catch (e) {
                const { status, error } = handleErrors(e);
                res.status(status).json({ error });
            }

        });

        // ---------------------------- UPDATE ----------------------------

        this.router.put("/:id", async (req: express.Request, res: express.Response) => {

            try {

                const aboutUpdateController = new AboutUpdateController({...req.body, ...req.params});
                const { updatedAbout } = await aboutUpdateController.updateController();

                res.status(SUCCESS_RESOURCE_UPDATED.status).json(updatedAbout);

            } catch (e) {
                const { status, error } = handleErrors(e);
                res.status(status).json({ error });
            }

        });

        // ---------------------------- FIND ALL ----------------------------

        this.router.get("/", async (req: express.Request, res: express.Response) => {
                
                try {
                    const aboutGetAllController = new AboutGetAllController();
                    const allAbout = await aboutGetAllController.getAllController();
    
                    res.status(SUCCESS_CONNECTION.status).json(allAbout);
    
                } catch (e) {
                    const { status, error } = handleErrors(e);
                    res.status(status).json({ error });
                }
    
            }
        );
// ---------------------------- FIND ONE ----------------------------

this.router.get("/:id", async (req: express.Request, res: express.Response) => {

    try {
        const aboutGetOneController = new AboutGetOneController(req.params.id);
        const oneAbout = await aboutGetOneController.GetOneController();

        res.status(SUCCESS_CONNECTION.status).json({ oneAbout });

    } catch (e) {
        const { status, error } = handleErrors(e);
        res.status(status).json({ error });


    }});
    }}
    