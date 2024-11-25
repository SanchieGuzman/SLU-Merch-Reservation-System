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
    const orgID = req.params.orgid;
    const productID = req.params.prodid;
    console.log(orgID);
    console.log(productID);
    res.send('view product controller')
}

export  {seeAllProductsController, viewProductController};