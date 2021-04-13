const express = require('express')
var cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const config = require('./.env')
const routes = require('./src/routes')

dotenv.config(config)
require('./src/database')

app.use(cors())
app.use(express.json())
app.use(express.static('images'))
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log('Listening to port ', process.env.PORT)
})
