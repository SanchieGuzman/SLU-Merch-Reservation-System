import { Router } from "express";
import signupController from "../controllers/singup.js";
const signupRouter = Router();

//define http method
signupRouter.post('/signup', signupController)

export default signupRouter;