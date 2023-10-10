/*

   Ce fichier configure et démarre un serveur HTTPS pour l'application express.
   Il utilise la classe HttpsServer pour créer un serveur HTTPS en utilisant les certificats SSL fournis.
   (dans le dossier certifications)

   Il est configuré avec l'application expressApp et il est démarrer sur le port spécifié.
   Il écoute les requêtes HTTPS et gère les connexions sécurisées pour l'application.

   Il faut comprendre que le serveur https et l'application express sont deux choses différentes.

   Pour résumer, la principale différence entre une application express et un serveur http ou https est que
   l'application express est une application web qui est responsable du routage des requêtes et de la gestion des réponses.

   Alors que le serveur http ou https est un serveur web qui est responsable de la gestion des connexions
   et de l'écoute des requêtes.
*/

import {Application} from 'express';
// import * as https from "https"; // not used yet, but will be used later
import * as http from "http";

import {ExpressApp} from "../express-web-api/ExpressApp";

export class HttpsServer {

    private app: Application = new ExpressApp().app;
    private readonly port: number;
    private server: http.Server

    constructor(port: number) {
        this.port = port;
        this.start();
    }

    // Cette méthode démarre le serveur HTTPS
    private start() {
        // options pour le serveur HTTPS (certificats SSL)
        // uncomment this when we will use https
        // const options = {
        //     key: fs.readFileSync(process.env.SSL_KEY_PATH),
        //     cert: fs.readFileSync(process.env.SSL_CERT_PATH)
        // };

        // Démarrage du serveur HTTPS
        this.server = http.createServer(this.app).listen(this.port, () => {
            console.log('Server started on port ' + this.port);
        });
    }

    public stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close((err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log('Server stopped');
                        resolve();
                    }
                });
            } else {
                console.error('Server not running');
                resolve();
            }
        });
    }
}

// Création d'une instance de serveur HTTPS avec l'application express et le port spécifié
new HttpsServer(Number(process.env.SERVER_HTTPS_PORT));