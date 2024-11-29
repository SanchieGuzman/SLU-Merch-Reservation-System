import Database from "../database/database.js";

const addToCartController = async(req, res)=>{
    try{
        // const db = Database.getInstance();
        // const result = await db.addToCart();
        console.log(req.body);
        res.send("added to cart")
    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

const getCartController = async(req, res)=>{
    try{
        // const db = Database.getInstance();
        // const result = await db.getCart();
        console.log(req.body);
        res.send("fetched cart")
    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export {addToCartController, getCartController};