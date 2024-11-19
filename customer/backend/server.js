import express from 'express'
import cookieParser from 'cookie-parser'
import { serverConfig } from './config.js';
//router imports
import loginRouter from './routers/login.js';
import signupRouter from './routers/singup.js';

//app
const app = express();
app.use(express.json())
app.use(cookieParser());

//routers
app.use('/api/', loginRouter)
app.use('/api/', signupRouter)

app.listen(serverConfig.port, ()=>{
    console.log(`Server app listening on port ${serverConfig.port}`)
})