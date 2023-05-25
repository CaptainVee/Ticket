const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database don ready o, go ${conn.connection.host} make you see am`.cyan.underline)
    } catch (error) {
        console.log(`where you collect ${error.message} from`)
        process.exit(1)
    }
}

module.exports = connectDB