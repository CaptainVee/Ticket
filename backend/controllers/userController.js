const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
// @desc Register a new user
// @route  api/users
// @access public

const registerUser = asyncHandler( async (request, response) => {
    const {name, email, password}  = request.body
    if (!name || !email || !password) {
        response.status(400)
        throw new Error("Please include all fields")

    }
    // find if user already exists
    const userExists = await User.findOne({email})
    if (userExists) {
        response.status(400)
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({name, email, password:hashedPassword})

    if (user) {
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email

        })
    } else {
        response.status(400)
        throw new Error("Invalid user data")
    }

    response.send("Register Route")
})

// @desc login a user
// @route  api/users/login
// @access public
const loginUser = asyncHandler (async (req, res) => {
    res.send("Login Route")
}
)

module.exports = {
    registerUser,
    loginUser,
}