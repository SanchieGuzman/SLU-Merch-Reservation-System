import Database from "../database/database.js";

const loginController = async(req, res)=>{
    const db = Database.getInstance();
    const result =  await db.login(req.body.username, req.body.password);    

    res.json(result);
}

export default loginController;