import { Router } from "express";
import { seeAllProductsController, viewProductController, completeOrderController } from "../controllers/_orgID.js";


const _orgIDRouter = Router()

//to be implemented by stephen
_orgIDRouter.get('/:orgid/products', seeAllProductsController)

_orgIDRouter.get('/:orgid/products/:prodid', viewProductController)

_orgIDRouter.post('/:orgid/checkout', completeOrderController)

export default _orgIDRouter;
