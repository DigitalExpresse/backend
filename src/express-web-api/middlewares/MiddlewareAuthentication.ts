import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ERROR_NOT_AUTHORIZED } from "@utils/messages/error_message";

// Extend 'Request' interface to include 'user' property
declare module 'express' {
    export interface Request {
        user?: JwtPayload;
    }
}

export class MiddlewareAuthentication {
    static authenticate(accessSecret: string, req: Request, res: Response, next: NextFunction) {
        const accessToken = req.cookies.accessToken;

        if (accessToken) {
            try {
                req.user = jwt.verify(accessToken, accessSecret) as JwtPayload;
                return next();
            } catch (e) {
                console.log(e)
                return res.status(401).json({ error: ERROR_NOT_AUTHORIZED.message });
            }
        }

        return res.status(401).json({ error: ERROR_NOT_AUTHORIZED.message + " access token not provided" });
    }
}
