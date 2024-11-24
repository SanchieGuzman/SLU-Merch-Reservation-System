import Database from "../database/database.js";

const loginController = async(req, res)=>{
    const db = Database.getInstance();

    const result =  await db.login(req.body.username, req.body.password);
    
    if(result){
        return res.sendStatus(200);
    }else{       
        res.status(400).json({message: 'Incorrect Credentials'});
    }
}

export default loginController;