import express from 'express'
import { createCustomer, deleteCustomer, fetchAllCustomers, updateCutomer } from '../controllers/CustomerController.js'

let customerRouter = express.Router()

customerRouter.get("/fetchcustomers", fetchAllCustomers)
customerRouter.post("/createcustomer", createCustomer)
customerRouter.delete("/deletecustomer", deleteCustomer)
customerRouter.put("/updatecustomer", updateCutomer)

export { customerRouter }