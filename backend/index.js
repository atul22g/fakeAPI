const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { json } = require('body-parser')
const authRoute = require("./router/auth-router");
const app = express();
app.use(json({limit:'50mb'}))
app.use(cors());
const port = 5000

// Database connection
require("./Database/conn");


// Home page
app.get('/', (req, res) => {
    res.send('FakeAPI Backend')
})

// Auth route
app.use("/api/user", authRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})