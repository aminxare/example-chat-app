import { Handler } from "@/@types";
import { ResponseError } from "@/helpers/response";
import jwt from "../lib/jwt";

const authMiddlware:Handler<unknown> = async(req,res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        const error: Partial<ResponseError> = new Error("not authenticated");
        error.statusCode = 401;
        return next(error);
    }

    const user = jwt.verify(token);

    if(!token) {
        const error: Partial<ResponseError> = new Error("not authenticated");
        error.statusCode = 401;
        return next(error);
    }

    req['user'] = user;
    next()
}

export default authMiddlware;