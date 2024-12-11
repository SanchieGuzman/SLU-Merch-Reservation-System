import Database from "../database/database.js";
import jwt from 'jsonwebtoken'

const loginController = async(req, res)=>{
    const db = Database.getInstance();
    const result =  await db.login(req.body.username, req.body.password);    
    
    if(result){

        const cookiesPayload = {
            username: req.body.username,
            user_id: result.user_id
        }

        //create a token
        const key = "stephen pogi";
        const token = jwt.sign(cookiesPayload, key, {algorithm: 'HS256'})

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
        }).cookie('token', token, {
            httpOnly: true, 
            path: '/',
            signed: true
        })
        .sendStatus(200);
    }else{       
        res.status(400).json({message: 'Incorrect Credentials'});
    }
};

export default loginController;
