import { Order } from "../models/OrderSchema.js";

let createOrder = async (req, res) => {
  let reqData = req.body;
  try {
    let result = await Order.create(reqData);
    res.status(200).json({
      data: result,
      message: "Order Added Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

let fetchAllOrders = async (req, res) => {
  try {
    let result = await Order.find().populate("customer").populate("items.food");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

let fetchOrdersByCustomer = async (req, res) => {
  let { customerId } = req.body;
  try {
    // let result = await Order.find({
    //     customer :customerId
    // })
    //     .populate("customer")
    //     .populate("items.food")

    let result = await Order.where("customer")
      .eq(customerId)
      .populate("customer")
      .populate("items.food");

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

let fetchTotalRevenue = async (req, res) => {
    try {
        const result = await Order.aggregate([
            {
                $match: {
                    status: "Delivered",
                }
            },
            // {
            //     $unwind: "$items" // Unwind the items array to process individual dishes
            // },
            {
                $group: {
                    _id: null, // No grouping key to calculate the total
                    totalRevenue: { $sum: "$totalPrice" } // Sum up the TotalAmount field
                }
            }
        ])
        console.log(result);
        res.status(200).json({ data: result })
    } catch (error) {
        console.log(error.message);
    }
}

let deleteOrder = async (req, res) => {
  try {
    let { orderId } = req.body;
    let result = await Order.findByIdAndDelete({ _id: orderId });
    res.status(200).json({
      message: "Order Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

let updateOrder = async (req, res) => {
  let { orderId, status } = req.body;
  let result = await Order.findByIdAndUpdate(
    { _id: orderId },
    { status: status },
    { new: true }
  );
  try {
    res.status(200).json({
      data: result,
      message: "Order Status Updated",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createOrder,
  fetchAllOrders,
  fetchOrdersByCustomer,
  deleteOrder,
  updateOrder,
  fetchTotalRevenue
};
