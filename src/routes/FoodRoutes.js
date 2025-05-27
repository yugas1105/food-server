import express from 'express'
import { createFood, deleteFood, fetchFood, updateFood } from '../controllers/FoodController.js'
import { upload } from '../middleware/FileUploadMiddleware.js'

let foodRouter = express.Router()

foodRouter.get("/fetchfood", fetchFood)
foodRouter.post("/createfood", upload.single("prodimage"), createFood)
foodRouter.delete("/deletefood", deleteFood)
foodRouter.put("/updatefood", updateFood)

export { foodRouter }