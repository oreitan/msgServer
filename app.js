const express = require ('express');
const router = require('./routers/router');

const app = express();
app.use(express.json());
app.use('',router);
app.all('*',(req,res)=>{
    res.status(404).send('Page not found');
});

module.exports = app;