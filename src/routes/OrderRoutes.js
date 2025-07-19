import express from 'express'
import { createOrder, deleteOrder, fetchAllOrders, fetchOrdersByCustomer, fetchTotalRevenue, updateOrder } from '../controllers/OrderController.js'

let orderRouter = express.Router()

orderRouter.get("/fetchorder", fetchAllOrders)
orderRouter.post("/createorder", createOrder)
orderRouter.delete("/deleteorder", deleteOrder)
orderRouter.put("/updateorder", updateOrder)

orderRouter.post("/fetchordersbycustomer", fetchOrdersByCustomer)
orderRouter.get("/fetchrevenue", fetchTotalRevenue)

export { orderRouter}