const express = require('express')
const app = express()
const port = 5000
const mangaRouter = require('./router/mangaRouter')
const userRouter = require('./router/userRouter')

app.use(express.json())
app.use('/api/manga/', mangaRouter)
app.use('/api/user/', userRouter)

app.listen(port, () => {
    console.log('Server is running with port', port)
})

