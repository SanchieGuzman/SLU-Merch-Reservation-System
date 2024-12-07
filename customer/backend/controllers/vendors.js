import Database from "../database/database.js";

const vendorsController = async(req, res) => {
    try {
        const db = Database.getInstance();

        const result = await db.getVendors();
        if (result){
            res.status(200).json(result);
        }else{
            return res.status(400).json({
                message: "No vendors found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export default vendorsController;