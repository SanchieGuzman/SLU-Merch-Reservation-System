// @ts-nocheck

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { serverConfig } from './config.js';

//router imports
import loginRouter from './routers/login.js';
import productsRouter from './routers/products.js';
import _orgIDRouter from './routers/_orgID.js';

//app
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors())

//routers
app.use('/api', loginRouter)
// app.use('/api', productsRouter)
app.use('/api', _orgIDRouter)

app.listen(serverConfig.port, ()=>{
    console.log(`Server app listening on port ${serverConfig.port}`)
})