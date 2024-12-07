import { Router } from "express";
import logoutController from "../controllers/logout.js";

const logoutRouter = Router();

logoutRouter.post('/logout', logoutController)

export default logoutRouter;