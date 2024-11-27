export const serverConfig = {
    host: process.env.NODE_SERVER_HOST || 'localhost',
    port: process.env.NODE_SERVER_PORT || 3000
}

export const databaseConfig = {
    host: 'leonardosDB',
    user: 'root',
    password: '',
    database: 'reservationdb'
}