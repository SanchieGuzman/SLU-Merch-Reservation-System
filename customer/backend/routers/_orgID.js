import { Router } from "express";
import { seeAllController, viewProductController } from "../controllers/_orgID.js";


const _orgIDRouter = Router()

//to be implemented by stephen
_orgIDRouter.get('/:orgid/products', seeAllController)

//to be implemented by leonhard
_orgIDRouter.get('/:orgid/products/:prodid', viewProductController)

export default _orgIDRouter;
