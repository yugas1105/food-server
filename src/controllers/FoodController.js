import { Food } from "../models/FoodSchema.js"

let createFood = async (req, res) => {
    let reqData = req.body
    try {
        let result = await Food.create(reqData)
        res.status(200).json({
            data: result,
            message: "Food Added Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let fetchFood = async (req, res) => {
    try {
        let result = await Food.find()
        res.status(200).json({
            data: result,
            message: "Fetched.."
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let deleteFood = async (req, res) => {
    try {
        let { foodId } = req.body
        let result = await Food.findByIdAndDelete({ _id: foodId })
        res.status(200).json({
            message: "Food Item Deleted"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let updateFood = async (req, res) => {
    let { foodId, price } = req.body
    let result = await Food.findByIdAndUpdate(
        { _id: foodId },
        { price: price },
        { new: true }
    )
    try {
        res.status(200).json({
            data: result,
            message: "Food price Updated"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

export { createFood, fetchFood, deleteFood, updateFood }