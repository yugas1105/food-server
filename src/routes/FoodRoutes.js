import express from 'express'
import { createFood, deleteFood, fetchDishesWithAvgratings,  fetchFood, updateFood } from '../controllers/FoodController.js'
import { upload } from '../middleware/FileUploadMiddleware.js'

let foodRouter = express.Router()

foodRouter.get("/fetchfood", fetchDishesWithAvgratings)
foodRouter.post("/createfood", upload.single("foodimage"), createFood)
foodRouter.delete("/deletefood", deleteFood)
foodRouter.put("/updatefood", updateFood)

export { foodRouter }