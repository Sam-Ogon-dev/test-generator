import {NO_AUTH_ROUTES, SECRET_JWT} from "../config";
import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

export function jwtMiddleware (req: Request, res: Response, next: NextFunction) {
    for (const noAuthRoute of NO_AUTH_ROUTES) {
        if(req.path === noAuthRoute) {
            next()
            return
        }
    }

    const token = req.header("Authorization")?.split("Bearer ")[1]

    try {
        jwt.verify(token!, SECRET_JWT)
        next()
    } catch (err) {
        res.sendStatus(401)
    }
}
