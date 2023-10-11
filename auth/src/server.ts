import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from "../config/database"
dotenv.config()
connectDB()

const app = express()
const port = process.env.AUTH_PORT || 5050

app.use(express.json())
app.use(cors())

// Rest API Routes

app.use("/api/users", require("../routes/userRoutes"))


app.listen(port, () => {
    console.log(`Development : Server running on http://localhost:${port}`)
})