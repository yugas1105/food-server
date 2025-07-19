import { Review } from "../models/ReviewSchema.js";

let createReview = async (req, res) => {
    let reqData = req.body
    try {
        let result = await Review.create(reqData)
        res.status(200).json({
            data: result,
            message: "Review Added Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let fetchAllReviews = async (req, res) => {
    try {
        let result = await Review.find()
            .populate("customer")
            .populate("food")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

let deleteReview = async (req, res) => {
    try {
        let { reviewId } = req.body
        let result = await Review.findByIdAndDelete({ _id: reviewId })
        res.status(200).json({
            message: "Review Deleted"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let updateReview = async (req, res) => {
    let { reviewId, rating } = req.body
    let result = await Review.findByIdAndUpdate(
        { _id: reviewId },
        { comment: comment },
        { new: true }
    )
    try {
        res.status(200).json({
            data: result,
            message: "Review Rating Updated"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


export { createReview, updateReview, fetchAllReviews, deleteReview }