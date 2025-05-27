import bodyParser from 'body-parser';
import express from 'express'
import { connectToDatabase } from './src/DB/dbConnection.js';
import { customerRouter } from './src/routes/CustomerRoutes.js';
import { foodRouter } from './src/routes/FoodRoutes.js';
import { reviewRouter } from './src/routes/ReviewRoutes.js';
import { orderRouter } from './src/routes/OrderRoutes.js';
import cors from 'cors'

let Server = express()

Server.use(bodyParser.json())

Server.use(cors())

connectToDatabase()

Server.use("/api", customerRouter)
Server.use("/api", foodRouter)
Server.use("/api", reviewRouter)
Server.use("/api", orderRouter)

Server.use("/Uploadimages", express.static("Uploadimages"))

Server.listen(5000, () => {
    console.log("Server Started");
})