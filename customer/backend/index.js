const serverConfig={
    host: 'localhost',
    port: '3000'
}

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();
app.use(bodyParser());
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("hello world")
})

app.listen(serverConfig.port, ()=>{
    console.log(`Server is listening on port ${serverConfig.port}`);
})