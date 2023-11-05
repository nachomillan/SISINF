const express = require('express')
require('dotenv').config();
var bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
app.use(cors())
const userRoutes = require('./routes/User')
const prodRoutes = require('./routes/Produccion')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());


app.use('/user', userRoutes)
app.use('/prod', prodRoutes)
app.use('/', (req, res) =>{
  res.send("hello WOrld!");
})


app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`)
})