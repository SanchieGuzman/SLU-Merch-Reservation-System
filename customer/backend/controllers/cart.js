import Database from "../database/database.js";

const addToCartController = async(req, res)=>{
    try{
        const organization_id = req.body.orgid;
        const user_id = req.cookies.user_id;
        const product_id = req.body.product_id;
        const quantity = req.body.quantity;

        const db = Database.getInstance();

       
        const existingItem = await db.getSingleCartRow(user_id, product_id, organization_id);
        if (existingItem) {
          const updatedRow = await db.updateCartRow(user_id, product_id, organization_id, quantity);
          if (updatedRow){
            return res.status(201).json({message: "Updated existing row"});
          }
        }else{
          const successAdding = await db.addToCart(organization_id, user_id, product_id, quantity);
          if(successAdding){
            return res.status(201).json({message: "Added product to cart"})
          }
        };
        
    }catch(error){   
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

const getCartController = async(req, res)=>{
    try{
        const user_id = req.cookies.user_id;

        const db = Database.getInstance();
        const result = await db.getCart(user_id);

        // Transformation
        const data = { user_id: user_id, orgArray: [] };

        for (let i = 0; i < result.length; i++) {
          
          const item = result[i];
          let orgFound = false;

          // Check if the organization already exists in orgArray
          for (let j = 0; j < data.orgArray.length; j++) {
            if (data.orgArray[j].orgid === item.organization_id) {
              orgFound = true;

              // Add the product to the existing organization
              data.orgArray[j].products.push({
                product_id: item.product_id,
                product_name: item.product_name,
                product_image: item.product_image,
                product_price: item.product_price,
                product_quantity: item.product_quantity,
                total: (item.product_price * item.product_quantity),
                total_stocks: item.total_stocks
              });
              break;
            }
          }

          // If organization is not found, create a new one
          if (!orgFound) {
            data.orgArray.push({
              orgid: item.organization_id,
              orgname: item.organization_name,
              products: [
                {
                  product_id: item.product_id,
                  product_name: item.product_name,
                  product_image: item.product_image,
                  product_price: item.product_price,
                  product_quantity: item.product_quantity,
                  total: (item.product_price * item.product_quantity),
                  total_stocks: item.total_stocks
                }
              ]
            });
          }
        }
                
        res.status(200).json(data)
    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

const deleteItemFromCartController = async(req, res)=>{
  try{
      const user_id = req.cookies.user_id;
      const db = Database.getInstance();
      const product_id = req.body.product_id;
      const org_id = req.body.org_id;
      const result = await db.deleteItemsFromCart(user_id,product_id,org_id);
     if(result){
      return res.status(200).json({
          message: "Deleted items successfully.",
      });
     }else{
      return res.status(400).json({
        message: "No items in cart found",
    });
     }
  }catch(error){
      return res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
      });
  }
}

export {addToCartController, getCartController, deleteItemFromCartController};