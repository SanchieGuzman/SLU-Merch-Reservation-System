import mysql from 'mysql2'
import { databaseConfig } from '../config.js';
import Product from '../classes/Product.js'

class Database {
    $dbInstance;

    constructor() {
        this.connection = mysql.createConnection(databaseConfig);
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err.message);
            } else {
                console.log('Connected to the database.');
            }
        });
    }

    static getInstance() {
        if (!Database.dbInstance) {
            Database.dbInstance = new Database();
        }
        return Database.dbInstance;
    }

    // login methoid
    async login(username, password) {
        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        
        //make the arguments an array
        const params = [username, password]
        const result = await this.execute(query, params);        

        if(result[0].username === username && result[0].password === password){
            return result[0];
        }else{
            return false;
        }
    }
    async getAllProductsOfOrg(organizationID){
        const query = 'SELECT product_id, product_name,product_description, price, quantity, product_image FROM products WHERE organization_id =? AND status = "Available"';
    
        const params = [organizationID]
        try {
            const result = await this.execute(query, params);

            if(result.length == 0){
                return false;
            }

            const products =[];

            for (let i = 0; i< result.length; i++){
                const item = result[i];

                const product = new Product(
                    item.product_id, 
                    item.product_name, 
                    null,
                    null, 
                    item.price, 
                    item.quantity, 
                    item.product_image, 
                    null);
                products.push(product);
            }

            return products;
            
        } catch (error) {
            console.error('Error executing query:', error);
            return false;
        }
    }
    async getProductDetails(productID){
        const query = 'SELECT product_id, product_name, product_image, product_description, price, quantity FROM products WHERE product_id =?';
        const params = [productID];
        const result = await this.execute(query, params);
        return result[0];
    }
    async getProductPrice(productID) {
        const query = `SELECT price FROM products WHERE product_id = ?;`;
        const params = [productID];
        const result = await this.execute(query, params);
        return result[0];
    }
    async getFirstProductsOfEachOrg(){
        const query = `
                SELECT 
                    p.product_id, 
                    p.product_name,
                    p.product_description,
                    p.quantity,
                    p.price, 
                    p.organization_id,
                    p.product_image,
                    o.organization_name
                FROM (
                    SELECT 
                        product_id, 
                        product_name, 
                        product_description, 
                        quantity, 
                        price, 
                        organization_id, 
                        product_image, 
                        ROW_NUMBER() OVER (PARTITION BY organization_id ORDER BY product_id ASC) AS row_num 
                    FROM products WHERE status = 'Available'
                ) AS p
                JOIN organizations o USING(organization_id)
                WHERE p.row_num <= 4; `;   
        try {
            const results = await this.execute(query);
            return results; 

        }catch(err){
            console.log("Error executing query");
            return false;
        }
    }

    //base ka nalang sa fetchexpress docs ano need pre, pero kahit result set lang bigay mo sakin, ako na bahala sa json formatting
    async addToCart(organization_id, user_id, product_id, quantity){
        const query = 'INSERT INTO cart (user_id, product_id, organization_id, quantity) VALUES (?,?,?,?);';
        const params = [user_id, product_id, organization_id, quantity];
        try{
            const result = await this.execute(query, params);
            if(result.affectedRows>0){
                return true;
            }else{
                return false;
            }
        }catch{
            console.error('Error adding to cart:', err);
            throw err;
        }
    }
    
    //base ka nalang sa fetchexpress docs ano need pre, pero kahit result set lang bigay mo sakin, ako na bahala sa json formatting
    async getCart(user_id){
                                                                                                                                //NOTE that i used "AS product_price, product_quantity to conform with fetch express"
        const query = `Select c.organization_id, o.organization_name, c.product_id, p.product_name , p.product_image,p.price AS product_price, c.quantity AS product_quantity, c.total
                        FROM cart AS c
                        JOIN products as P ON c.product_id = p.product_id 
                        JOIN organizations as o ON o.organization_id = p.organization_id 
                        WHERE c.user_id = ?;`;
        const params = [user_id];
        try {
            const results = await this.execute(query, params);
            return results; 
        }catch(err){
            console.log("Error executing query");
            return false;
        }
        
    }

    async getOrders(user_id){                                                                                                           //NOTE that i used "AS product_price, product_quantity to conform with fetch express"
        const query = `SELECT o.order_id, org.organization_id, org.organization_name, o.created_at, o.claimed_at, o.total, o.status, o.schedule_id, 
                    os.location,
                    op.product_id, op.quantity, op.total AS product_price,
                    p.product_name, p.product_image
                    FROM organization_schedules AS os
                    JOIN orders AS o ON os.schedule_id = o.schedule_id
                    JOIN order_products AS op ON o.order_id = op.order_id
                    JOIN products AS p ON op.product_id = p.product_id
                    JOIN organizations AS org ON p.organization_id = org.organization_id
                    WHERE o.customer_id = ? ORDER BY o.order_id DESC`;
        const params = [user_id];
        try {
            const results = await this.execute(query, params);
            return results; 
        }catch(err){
            console.log("Error executing query");
            return false;
        }
        
    }

    async getValidSchedules(orgID) {
        const currentDateTime = new Date();
        const query = `
            SELECT schedule_id, date, start_time, end_time, location FROM organization_schedules 
            WHERE organization_id = ? 
            AND (
                date > CURRENT_DATE OR
                (date = CURRENT_DATE AND start_time > NOW())
            );
        `;

        const params = [orgID, currentDateTime, currentDateTime];

        try {
            const result = await this.execute(query, params);
            return result;
        } catch(error) {
            console.log("Failed to fetch schedules");
        }
    }
    async placeOrder(order) {
        try {
            await this.execute("START TRANSACTION");
    
            const orderQuery = `
                INSERT INTO orders (customer_id, created_at, total, status, claimed_at, schedule_id) 
                VALUES (?, NOW(), ?, 'Pending', NULL, ?);
            `;
    
            const orderParams = [
                order.customer_id,
                order.total,
                order.schedule_id,
            ];
    
            const result = await this.execute(orderQuery, orderParams);
    
            const orderID = result.insertId;
    
            const orderProductsQuery = `
                INSERT INTO order_products (order_id, product_id, quantity, total) 
                VALUES (?, ?, ?, ?);
            `;
    
            const orderProductsInsertPromises = order.products.map(product => {
                const orderProductsParams = [orderID, product.product_id, product.quantity, product.total];
                return this.execute(orderProductsQuery, orderProductsParams);
            });
    
            await Promise.all(orderProductsInsertPromises);
    
            await this.execute("COMMIT");
    
            return result;
        } catch (error) {
            await this.execute("ROLLBACK");
            console.error("Error placing order:", error);
        }
    }
    async getVendors(){
        const query = `SELECT 
                            o.organization_id, 
                            o.organization_name, 
                            o.organization_description, 
                            o.logo,
                            os.schedule_id, 
                            os.date, 
                            os.start_time, 
                            os.end_time, 
                            os.location
                        FROM 
                            organizations AS o
                        LEFT JOIN 
                            organization_schedules AS os 
                            ON o.organization_id = os.organization_id
                            AND (
                                os.date > CURDATE() 
                                OR (os.date = CURDATE() AND os.start_time >= CURTIME())
                            )
                        WHERE 
                            os.schedule_id = (
                                SELECT os2.schedule_id
                                FROM organization_schedules AS os2
                                WHERE os2.organization_id = o.organization_id
                                AND (
                                    os2.date > CURDATE() 
                                    OR (os2.date = CURDATE() AND os2.start_time >= CURTIME())
                                )
                                ORDER BY os2.date ASC, os2.start_time ASC
                                LIMIT 1
                            )
                            OR os.schedule_id IS NULL;`;
        try{
            const results = await this.execute(query)
            return results;
        }catch (error){
            console.log("Error getting Vendors");
            return false;
        }
    }
    // ETO ANG TEMPLATE FOR EXECUTING A QUERY. returns a promise object
    execute(query, params = []) {       
        return new Promise((resolve, reject) => {
            this.connection.query(query, params, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}

export default Database;