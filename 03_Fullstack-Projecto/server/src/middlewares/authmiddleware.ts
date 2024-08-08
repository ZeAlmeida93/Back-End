import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "";

export function checkRole(roles: string[]) {

    return function (req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split("")[1];

        if (!token) {

            return res.status(401).json({ error: "Unauthorized. No Toekn provided" });

        }

        try { //we use the try/catch in order to valide the decoded token --> REPEAT AGAIN
            const decodedToken: any = jwt.verify(token, SECRET_KEY);

            if (!roles.includes(decodedToken.role)) {
                return res.status(403).json({
                    error: "Access Forbiden."
                })
            }
        } catch (error) {
            return res.status(403).json({ error: "Acccess Forbiden. User doesnt havd the required code" })

        }
        //console.log(decodedToken);



        console.log(token);
        next();


    }

}