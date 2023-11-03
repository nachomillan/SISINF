const express = require('express')
require('dotenv').config();
var bodyParser = require('body-parser')
const app = express()
const { Client } = require('pg');
const port = process.env.port
const userRoutes = require('./routes/User')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/user', userRoutes)
app.use('/', (req, res) =>{
  res.send("hello WOrld!");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})