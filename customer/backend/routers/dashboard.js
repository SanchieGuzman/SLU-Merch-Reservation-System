import { Router } from "express";
import dashboardController from "../controllers/dashboard.js";

const dashboardRouter = Router();

dashboardRouter.get('/dashboard', dashboardController);

export default dashboardRouter;