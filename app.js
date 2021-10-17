const express = require("express");
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require("body-parser");
const cors =require('cors');
const app = express();
const safeRoute = require('./routes/safe');

app.use(cors());
app.use(bodyParser.json());

app.use('/safe',safeRoute);

mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("connected");
})
app.listen(8000);


