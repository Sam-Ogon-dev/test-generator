import {Express} from "express";
import {Controller} from "../controllers/controllers";
import {formControllerData} from "./helpers";

export function routes(app: Express, controllers: Controller) {
    app.get("/api/v1/auth", (req, res) => {
        controllers.auth(formControllerData(req, res))
    })
    app.get("/api/v1/auth-return", (req, res) => {
        controllers.authReturn(formControllerData(req, res))
    })
    app.get("/api/v1/get-random-number", (req, res) => {
        controllers.getRandomNumber(formControllerData(req, res))
    })
}
