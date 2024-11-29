import Database from "../database/database.js";

const addToCartController = async(req, res)=>{
    try{
        const organization_id = req.body.orgid;
        const user_id = req.body.user_id;
        const product_id = req.body.product_id;
        const quantity = req.body.orgid;

        const db = Database.getInstance();
        const result = await db.addToCart(organization_id, user_id, product_id, quantity);

        // debugging purposes
        console.log(result);

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
        const user_id = req.body.user_id;

        const db = Database.getInstance();
        const result = await db.getCart(user_id);

        console.log(result);

        res.send("fetched cart")
    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export {addToCartController, getCartController};