import { Router } from "express";


import vendorsController from "../controllers/vendors.js";
const vendorsRouter = Router();

vendorsRouter.get('/vendors', vendorsController);

export default vendorsRouter;