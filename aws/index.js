const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const playsRoutes = require("./API/routes/plays");
const userRoutes = require("./API/routes/users");


app.use(express.json());
app.use("/plays", usersRoutes);
app.use("/dividas", dividasRoutes);


app.get('/', function (req, res) {
  res.send('GET request to homepage')
})

app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    message: "Error not found! Status: " + status,
  });
});

module.exports = app;