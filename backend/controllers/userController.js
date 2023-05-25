const asyncHandler = require('express-async-handler')
// @desc Register a new user
// @route  api/users
// @access public

const registerUser = asyncHandler( async (request, response) => {
    const {name, email, password}  = request.body
    if (!name || !email || !password) {
        response.status(400)
        throw new Error("Please include all fields")
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