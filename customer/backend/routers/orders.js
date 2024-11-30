import { Router } from "express";
import { getOrdersController } from "../controllers/orders.js";

const ordersRouter = Router();
ordersRouter.get('/orders', getOrdersController);

export default ordersRouter;