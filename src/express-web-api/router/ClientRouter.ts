import express from "express";

export class ClientRouter {

    public router: express.Router;

    constructor() {
        this.router = express.Router();

    }
}