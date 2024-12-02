import Database from "../database/database.js";

const addToCartController = async(req, res)=>{
    try{
        const organization_id = req.body.orgid;
        const user_id = req.cookies.user_id;
        const product_id = req.body.product_id;
        const quantity = req.body.orgid;

        const db = Database.getInstance();
        try{
            const result = await db.addToCart(organization_id, user_id, product_id, quantity);
            res.sendStatus(201)

        }catch(error){
            res.sendStatus(400);
        }

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

        const transformedData = {
            user_id: user_id,
            orgArray: result.reduce((acc, item) => {
              const orgIndex = acc.findIndex((org) => org.orgid === item.organization_id);
              const product = {
                product_id: item.product_id,
                product_name: item.product_name,
                product_image: item.product_image, // placeholder for actual blob
                product_price: parseFloat(item.product_price),
                product_quantity: item.product_quantity,
                total: parseFloat(item.product_price) * item.product_quantity,
              };
          
              if (orgIndex === -1) {
                acc.push({
                  orgid: item.organization_id,
                  orgname: item.organization_name,
                  products: [product],
                });
              } else {
                acc[orgIndex].products.push(product);
              }
          
              return acc;
            }, []),
          };


        res.status(200).json(transformedData)
    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export {addToCartController, getCartController};