const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

const userRouter = require('./routers/userRoute')
const transactionRouter = require('./routers/transactionRoute')

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extented: false}))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./passport')(passport)

app.use('/api/users', userRouter)
app.use('/api/transaction', transactionRouter)


app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our application'
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    mongoose.connect('mongodb://localhost/money-management-app',
     { useNewUrlParser: true },
     () => {
        console.log('Database Connected')
    })
})
