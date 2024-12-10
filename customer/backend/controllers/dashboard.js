import Database from "../database/database.js";

const dashboardController = async(req, res) => {
    const userID = req.cookies.user_id;

    if (!userID) {
        return res.status(400).json({ message: "User ID is missing" });
    }

    try {
        const db = Database.getInstance();

        const completedOrdersList = await db.getCompletedOrders(userID);
        const latestOrdersList = await db.getLatestOrder(userID);
        const reservedProducts = await db.getReservedOrders(userID);

        const map = new Map();

        for (const item of reservedProducts) {
            const orderID = item.order_id;
            const orgName = item.organization_name;

            if (!map.has(orderID)) {
                map.set(orderID, {
                    order_id: orderID,
                    organization_name: orgName,
                    products: [],
                });
            }

            map.get(orderID).products.push({
                product_name: item.product_name,
                product_image: item.product_image,
                quantity: item.quantity,
                total: item.total,
                status: item.status,
            });
        }

        const data = Array.from(map.values());

        return res.status(200).json({
            completedOrders: completedOrdersList,
            latestOrders: latestOrdersList,
            reservedProducts: data,
        });

    } catch(error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default dashboardController;