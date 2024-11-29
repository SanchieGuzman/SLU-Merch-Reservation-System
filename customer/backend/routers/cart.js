import { Router } from "express";
import { addToCartController, getCartController } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.post('/cart', addToCartController);
cartRouter.get('/cart', getCartController);

export default cartRouter;