const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
})

userSchema.pre('save', async function (next) {
    // Ma hoa password truoc khi luu user vao database

    // Check xem password co duoc sua hay khong
    // neu khong sua thi next
    if (!this.isModified('password')) return next()
    //neu sua thi ma hoa
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (err) {
        return next(err)
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User