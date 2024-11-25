import mysql from 'mysql2'
import { databaseConfig } from '../config.js';

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

        return result[0];
    }
    async getAllProductsOfOrg(organizationID){
        const query = 'SELECT product_id, product_name, organization_id, price, quantity, product_image, status FROM products WHERE organization_id =? AND status = "Available"';
    
        const params = [organizationID]
        const result = await this.execute(query, params);
        return result;
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