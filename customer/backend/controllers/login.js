import Database from "../database/database.js";

const loginController = async(req, res)=>{
    const db = Database.getInstance();
    const result =  await db.login(req.body.username, req.body.password);    
    
    if(result){
        return res.cookie("loggedin", "true", {
            httpOnly: true, 
            path: '/',
            signed: true
        }).cookie("username", req.body.username, {
            httpOnly: false,
            path: '/',
            signed: false  
        }).cookie("user_id", result.user_id, {
            httpOnly: true,
            path: '/',
            signed: false
        })
        .sendStatus(200);
    }else{       
        res.status(400).json({message: 'Incorrect Credentials'});
    }
}

export default loginController;