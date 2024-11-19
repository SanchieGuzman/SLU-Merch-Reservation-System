import { Router } from "express";
import loginController from "../controllers/login.js";
const loginRouter = Router();

//define http method
loginRouter.post('/login', loginController)

export default loginRouter;