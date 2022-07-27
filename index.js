const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan') // loger
const bodyParser = require('body-parser')
const routes = require('./routes/index')

const app = express()

dotenv.config()
//middlware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//connect db
const URI = process.env.MONGODB_URL

mongoose.connect(URI, {
    autoIndex: false
}, (err) => {
    if(err){    
        console.log(err)
    }
    console.log('connect db success')
})

// routes
app.use('/api',routes.productRoute)
app.use('/', (req, res) => {
    res.json('hello')
})
// 404 handler
// app.use((req, res, next) => {
//     next
// })
app.listen(3000, () => {
    console.log('run at port 3000')
})