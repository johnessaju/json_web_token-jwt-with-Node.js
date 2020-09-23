const express = require('express');
const app = express();



const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongodb_uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("connected to databse"));

const routes = require('./routes/userroutes');
const port = process.env.PORT;

app.use(express.json());
app.use('/',routes);
app.use(express.json());
app.listen(port,console.log(`server started at port: ${port}`));