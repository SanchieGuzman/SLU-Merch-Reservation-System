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

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app
const app = express();
app.use(express.json())
app.use(cookieParser());
// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

//routers
app.use('/api', loginRouter)
app.use('/api', productsRouter)
app.use('/api', _orgIDRouter)

app.listen(serverConfig.port, serverConfig.host, ()=>{
    console.log(`Server app listening on host ${serverConfig.host} port ${serverConfig.port}`)
})