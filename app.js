
const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/node_api', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('Connect database successfuly.'))
    .catch((err) => console.log('Connect database error: ' + err))

const app = express()

const userRouter = require('./routes/user')

app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/users', userRouter)

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK.'
    })
})

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500
    return res.status(status).json({
        error: {
            status: status,
            message: error.message
        }
    })
})

const port = app.get('port') || 3000

app.listen(port, () => console.log(`Server is running on port ${port}`))