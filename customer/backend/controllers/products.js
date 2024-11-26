import Database from "../database/database.js";

const productsController = async(req, res) => {
    try {
        const db = Database.getInstance();

        const result = await db.getFirstProductsOfEachOrg();

        if (result) {
            const map = new Map();

            for (const item of result) {
                const orgID = item.organization_id;
                const orgName = item.organization_name;

                if (!map.has(orgID)) {
                    map.set(orgID, {
                        organization_name: orgName,
                        organization_id: orgID,
                        products: [],
                    });
                }

                map.get(orgID).products.push({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    product_image: item.product_image,
                    product_price: item.product_price,
                    product_quantity: item.product_quantity,
                })
            }

            const data = Array.from(map.values());
            
            return res.status(200).json(data);
        } else {
            return res.status(400).json({
                message: "No products found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export default productsController;