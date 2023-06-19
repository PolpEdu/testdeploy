const express = require("express")
const mongoose = require("mongoose")
const app = express()
const gameLogic = require("./sockets/game-logic")
const httpServer = require("http").createServer();
require("dotenv").config();


const bodyParser = require("body-parser")
const playsRoutes = require("./API/routes/plays")
//const userRoutes = require("./API/routes/users")
const cors = require("cors")
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}


const io = require("socket.io")(httpServer, {
  cors: {
    origin: process.env.FRONT_END_URL, // <- url from frontend
    methods: ["GET", "POST"],

    credentials: true
  }
})
gameLogic.init();

io.on('connection', function (client) {
  console.log('New client connected (id=' + client.id + ').')

  gameLogic.initializeGame(io, client)
})


app.use(cors(corsOptions))
app.use(express.json())
app.use("/plays", playsRoutes)
//app.use("/user", userRoutes)

console.log("DB: " + process.env.DB_CONNECTION)
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
mongoose.Promise = global.Promise

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

app.set('port', process.env.PORT || 5000)

httpServer.listen(app.get('port')).on('listening', () => {
  console.log('\nSocket & Express 🚀 are live on ' + app.get('port'))
})

app.use((err, req, res, next) => {
  const status = err.status || 500

  console.log(status)
  res.status(status).json({
    message: "Error not found! Status: " + status,
  })
})






module.exports = app