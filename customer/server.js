// @ts-nocheck

import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import { serverConfig } from './backend/config.js';

//router imports
import loginRouter from './backend/routers/login.js';
import productsRouter from './backend/routers/products.js';
import _orgIDRouter from './backend/routers/_orgID.js';
import vendorsRouter from './backend/routers/vendors.js';
import authenticate from './backend/middleware/authenticate.js';
import cartRouter from './backend/routers/cart.js';
import ordersRouter from './backend/routers/orders.js';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app
const app = express();
app.use(express.json())
app.use(cookieParser('stephen pogi'));

// Serve public assets (CSS, JS, resources and index.thml) without authentication
app.use('/resources', express.static(path.join(__dirname, 'frontend', 'resources')));
app.use('/javascript', express.static(path.join(__dirname, 'frontend', 'javascript')));
app.use('/styles', express.static(path.join(__dirname, 'frontend', 'styles')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Protect all pages files
app.use('/pages', authenticate, express.static(path.join(__dirname, 'frontend', 'pages')));

//routers
app.use('/api', loginRouter)
app.use('/api', productsRouter)
app.use('/api', _orgIDRouter)
app.use('/api', cartRouter)
app.use('/api', ordersRouter)
app.use('/api', vendorsRouter)

//custom 404
// app.use((req, res, next) => {
//     res.status(404).send("Sorry can't find that!")
// })

app.listen(serverConfig.port, serverConfig.host, ()=>{
    console.log(`Server app listening on host ${serverConfig.host} port ${serverConfig.port}`)
})