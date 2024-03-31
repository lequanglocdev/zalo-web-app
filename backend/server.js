require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const dbConnect = require("./config/dbConnect")
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/userRoute")

const port = process.env.PORT || 8888

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())

dbConnect()
app.use("/v1/auth", authRoute)
app.use("/v1/user", userRoute)

app.listen(port, () => {
  console.log("Server is running on port", port);
})
