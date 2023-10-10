/*

    Ce fichier configure l'application Express pour qu'elle soit prête à être utilisée par le serveur HTTPS.

    On configure l'application Express avec les middlewares de base tels
    que l'analyseur de corps JSON, l'analyseur de cookies ect ...

    On ajoute des en-têtes de sécurité pour prévenir les attaques ect ...

    On monte également les routes principales de l'application sur l'application Express.

    Ce fichier est appelé par le fichier src/https-server/server.ts à la racine du dossier src.

*/

// Importation des modules (module-alias permet d'utiliser des alias pour les chemins d'importation)
require("module-alias/register.js");
require("dotenv").config();

import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { Router } from "./router/Router";

import { PrismaClient } from ".prisma/client";

// Middlewares basic config
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");

// Ici ont créé une instance de Prisma qui nous permettra d'interagir avec la base de données.
export const prisma = new PrismaClient();

export class ExpressApp {
  public app: Application;
  private router = new Router().router;

  constructor() {
    this.app = express();
    this.configureBasicMiddlewares(); // Configuration des middlewares de base
    this.setSecurityHeaders(); // Configuration des headers de sécurité
    this.setRoutes(); // Configuration des routes
  }

  // Configuration des middlewares de base
  private configureBasicMiddlewares(): void {
    this.app.use(bodyParser.json({ limit: "501mb" })); // Rend les données JSON disponibles dans les requêtes (req.body)
    this.app.use(cookieParser(process.env.SESSION_SECRET)); // Rend les cookies disponibles dans les requêtes (req.cookies)
    this.app.use(
      cors({
        origin:
          process.env.NODE_ENV === "development"
            ? [process.env.FRONTEND_URL]
            : [process.env.FRONTEND_URL_PROD],
        credentials: true,
      })
    );
    this.app.use(morgan("dev")); // Journalisation des requêtes HTTP (on voit les requêtes dans la console)
  }

  // Configuration des headers de sécurité
  private setSecurityHeaders(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("X-Frame-Options", "SAMEORIGIN"); // Empêche le clickjacking
      res.setHeader("X-Content-Type-Options", "nosniff"); // Empêche le sniffing MIME
      res.setHeader("X-XSS-Protection", "1; mode=block"); // Active la protection XSS
      res.setHeader("CSRF-TOKEN", "randomly_generated_token"); // Protection CSRF
      res.setHeader("Access-Control-Allow-Credentials", "true"); // Configuration CORS
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Configuration CORS
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      ); // Configuration CORS
      // res.setHeader('Cache-Control', 'max-age=31536000');
      next();
    });
  }

  // Configuration des routes
  private setRoutes(): void {
    this.app.use("/api", this.router); // Montage des routes principales sur l'application
  }
}
