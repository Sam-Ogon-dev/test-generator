import {Request, Response} from "express";
import {Controller, ControllerData} from "../controllers/controllers";
import {Express} from "express";
import {routes} from "./auth";
import Service from "../services/Services";
import RepositoryImpl from "../services/RepositoryImpl";
import {jwtMiddleware} from "./jwtMiddleware";
import MicroServiceClientImpl from "../services/MicroServiceClientImpl";

export function formControllerData(req: Request, res: Response): ControllerData {
    return {
        getBody<T>(): T {
            return req.body
        },
        response<T>(body: T): void {
            res.send(body)
        },
        getQuery(): {[field: string]: string} {
            const query = {} as {[field: string]: string}
            for (const queryKey in req.query) {
                query[queryKey] = <string>req.query[queryKey]
            }
            return query
        },
        setHeader(value: { [p: string]: string }) {
            res.header(value)
        },
        redirect(url: string) {
            res.redirect(url)
        }
    } as ControllerData
}

export function initRoutes(app: Express) {
    app.use(jwtMiddleware)
    routes(app, new Controller(new Service(new RepositoryImpl(), new MicroServiceClientImpl())))
}
