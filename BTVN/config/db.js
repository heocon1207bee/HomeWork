const mongoose = require('mongoose')

const connectDatabase = async function () {
    // thuc hien connect database
    try {
        const dbConfig = 'mongodb://localhost/fullstack-ecommerce'
        const connect = await mongoose.connect(dbConfig)
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (err) {
        console.log('Error connecting to MongoDB:', err)
    }
}

module.exports = connectDatabase