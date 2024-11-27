import { Router } from "express";
import { seeAllProductsController, viewProductController } from "../controllers/_orgID.js";


const _orgIDRouter = Router()

//to be implemented by stephen
_orgIDRouter.get('/:orgid/products', seeAllProductsController)

//to be implemented by leonhard
_orgIDRouter.get('/:orgid/products/:prodid', viewProductController)

export default _orgIDRouter;
