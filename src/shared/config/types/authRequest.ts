import { Request } from "express";
import { UserPayload } from "./userPayLoad";

export interface AuthRequest extends Request {
    userData?: UserPayload;
}
