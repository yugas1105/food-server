import express from 'express'
import { createReview, deleteReview, fetchAllReviews, updateReview } from '../controllers/ReviewController.js'

let reviewRouter = express.Router()

reviewRouter.get("/fetchallreviews", fetchAllReviews)
reviewRouter.post("/createreview", createReview)
reviewRouter.delete("/deletereview", deleteReview)
reviewRouter.put("/updatereview", updateReview)

export { reviewRouter }