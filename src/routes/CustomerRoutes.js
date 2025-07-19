import express from 'express'
import { createCustomer, deleteCustomer, doLogin, fetchAllCustomers, updateCutomer } from '../controllers/CustomerController.js'

let customerRouter = express.Router()
console.log(customerRouter);

customerRouter.get("/fetchcustomers", fetchAllCustomers)
customerRouter.post("/createcustomer", createCustomer)
customerRouter.delete("/deletecustomer", deleteCustomer)
customerRouter.put("/updatecustomer", updateCutomer)
customerRouter.post("/dologin", doLogin)

export { customerRouter }