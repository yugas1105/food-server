import { Customer } from "../models/CustomerSchema.js";

let createCustomer = async (req, res) => {
    let reqData = req.body
    try {
        let result = await Customer.create(reqData)
        res.status(200).json({
            data: result,
            message: "Customer Added Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let fetchAllCustomers = async (req, res) => {
    try {
        let result = await Customer.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

let deleteCustomer = async (req, res) => {
    try {
        let { customerId } = req.body
        let result = await Customer.findByIdAndDelete({ _id: customerId })
        res.status(200).json({
            message: "Customer Deleted"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

let updateCutomer = async (req, res) => {
    let { customerId, password } = req.body
    let result = await Customer.findByIdAndUpdate(
        { _id: customerId }, 
        { password: password }, 
        { new: true }
    )
    try {
        res.status(200).json({
            data: result,
            message: "Customer Password Updated"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

export { createCustomer, fetchAllCustomers, deleteCustomer, updateCutomer }