const express = require("express");
const path = require('path')
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


// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  // set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Wellcon to captain vee version of support desk API" });
});

}


app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Hurray your server don dey work for port ${PORT}`)
);
