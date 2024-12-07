import Database from "../database/database.js";

const dashboardController = async(req, res) => {
    const userID = req.cookies.user_id;

    if (!userID) {
        return res.status(400).json({ message: "User ID is missing" });
    }

    try {
        const db = Database.getInstance();

        const completedOrdersList = await db.getCompletedOrders(userID);
        console.log("Completed Orders:", completedOrdersList);

        const latestOrdersList = await db.getLatestOrder(userID);
        console.log("Latest Orders:", latestOrdersList);

        const reservedProductsList = await db.getReservedOrders(userID);
        console.log("Reserved Products:", reservedProductsList);


        return res.status(200).json({
            completedOrders: completedOrdersList,
            latestOrders: latestOrdersList,
            reservedProducts: reservedProductsList,
        });
    } catch(error) {
        console.log("Failed to fetch data");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default dashboardController;