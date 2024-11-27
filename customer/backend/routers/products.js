import { Router } from "express";
import productsController from "../controllers/products.js";
const productsRouter = Router();

productsRouter.get('/products', productsController);

export default productsRouter;