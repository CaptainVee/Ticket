const express = require("express");
const { ppid } = require("process");
const colors = require('colors')
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")

const PORT = process.env.PORT || 8000;

// connect to database
connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(500).json({ message: "hello" });
});


// Routes
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Hurray your server don dey work for port ${PORT}`)
);
