import Database from "../database/database.js";

//to be implemented by stephen
const seeAllProductsController = async(req, res)=>{
    const db = Database.getInstance();
    const result =  await db.getAllProductsOfOrg(req.params.orgid);

    if(result){
        res.json(result)
    }else{
        res.send(200)
    }    
}

//to be implemented by leonhard
const viewProductController = async(req, res)=>{
    try {
        const orgID = req.params.orgid;
        const prodID = req.params.prodid;
        
        const db = Database.getInstance();

        const result = await db.getProductDetails(prodID);

        if (result) {
            return res.status(200).json({
                org_id: orgID,
                product_id: prodID,
                product_name: result.product_name,
                product_image: result.product_image,
                product_description: result.product_description,
                product_price: result.price,
                product_quantity: result.quantity,
            });
        } else {
            return res.status(400).json({
                message: "Product not found",
            });
        }
    } catch(error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export  {seeAllProductsController, viewProductController};