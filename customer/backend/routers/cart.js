import { Router } from "express";
import { addToCartController, getCartController, deleteItemFromCartController } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.post('/cart', addToCartController);
cartRouter.get('/cart', getCartController);
cartRouter.delete('/cart', deleteItemFromCartController);

export default cartRouter;