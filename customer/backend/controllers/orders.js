import Database from "../database/database.js";

const getOrdersController = async(req, res)=>{
    const user_id = req.body.user_id;
    const db = Database.getInstance();
    const result = await db.getOrders(user_id);
    try{
        if(result){
            const ordersMap = new Map();
            for (const item of result) {
                const orderId = item.order_id;

                if (!ordersMap.has(orderId)) {
                    ordersMap.set(orderId, {
                        order_id: orderId,
                        organization_id: item.organization_id,
                        organization_name: item.organization_name,
                        status: item.status,
                        total: item.total,
                        created_at: item.created_at,
                        claimed_at: item.claimed_at,
                        location: item.location,
                        products: [],
                    });
                }

                ordersMap.get(orderId).products.push({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    product_image: item.product_image,
                    product_price: item.product_price,
                    quantity: item.quantity,
                });
            }

            const data = Array.from(ordersMap.values());
            return res.status(200).json(data);
        } else{
            return res.status(400).json({
                message: "No orders found",
            });  
        }
    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

export {getOrdersController};