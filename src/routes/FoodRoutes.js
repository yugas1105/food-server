import express from 'express'
import { createFood, deleteFood, fetchDishesWithAvgratings,  fetchFood, fetchRecent, fetchTopDishes, updateFood } from '../controllers/FoodController.js'
import { upload } from '../middleware/FileUploadMiddleware.js'

let foodRouter = express.Router()

foodRouter.get("/fetchfood", fetchDishesWithAvgratings)
foodRouter.get("/fetchrecent", fetchRecent)
foodRouter.get("/fetchtopdishes",fetchTopDishes)
foodRouter.post("/createfood", upload.single("foodimage"), createFood)
foodRouter.delete("/deletefood", deleteFood)
foodRouter.put("/updatefood", updateFood)

export { foodRouter }