/*

  Ce fichier contient le routeur principal de l'application (Router),
  ainsi que les routeurs spécifiques aux administrateurs (AdminRouter) et aux clients (ClientRouter).

  Toutes les routes de l'application seront importées dans ce fichier et montées sur le routeur principal.

  Les routes pour les clients comprennent la connexion, l'inscription et d'autres fonctionnalités
  spécifiques aux clients.
  Les routes pour les administrateurs concernent la connexion, l'inscription et d'autres fonctionnalités propres aux administrateurs.

  Ce fichier facilitera séparation des routes et permet une gestion modulaire des fonctionnalités.

*/

import express from "express";

import {ClientRouter} from "./ClientRouter";
import {AdminRouter} from "./AdminRouter";
import {AboutRouter} from "./AboutRouter";
import {TableRouter} from "@root/router/TableRouter";
import {ReservationRouter} from "@root/router/ReservationRouter";
import {ServiceRouter} from "@root/router/ServiceRouter";
import {OpeningHourRouter} from "@root/router/OpeningHourRouter";
import {MenuRouter} from "@root/router/MenuRouter";
import {CardRouter} from "@root/router/CardRouter";
import {ProductRouter} from "@root/router/ProductRouter";
import {CategoryRouter} from "@root/router/CategoryRouter";
import {MenuProductRouter} from "@root/router/MenuProductRouter";
import {CardProductRouter} from "@root/router/CardProductRouter";
import {ProductSupplementRouter} from "@root/router/ProductSupplementRouter";
import {ProductChoiceRouter} from "@root/router/ProductChoiceRouter";

import {NotificationRouter} from "./NotificationRouter";
import {HolidayRouter} from "@root/router/HolidayRouter";

export class Router {
    public router: express.Router;

    constructor() {
        this.router = express.Router();

        this.router.use('/client', new ClientRouter().router);
        this.router.use('/admin', new AdminRouter().router);
        this.router.use('/about', new AboutRouter().router);
        this.router.use('/opening-hour', new OpeningHourRouter().router);

        this.router.use('/table', new TableRouter().router);
        this.router.use('/reservation', new ReservationRouter().router);
        this.router.use('/service', new ServiceRouter().router);
        this.router.use('/holiday', new HolidayRouter().router)
        this.router.use('/notification', new NotificationRouter().router);

        this.router.use('/menu', new MenuRouter().router);
        this.router.use('/card', new CardRouter().router);
        this.router.use('/product', new ProductRouter().router);
        this.router.use('/product-supplement', new ProductSupplementRouter().router)
        this.router.use('/product-choice', new ProductChoiceRouter().router)
        this.router.use('/category', new CategoryRouter().router);
        this.router.use('/card-product', new CardProductRouter().router);
        this.router.use('/menu-product', new MenuProductRouter().router);

    }
}
