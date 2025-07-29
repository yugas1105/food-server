import { Customer } from "../models/CustomerSchema.js"
import { Food } from "../models/FoodSchema.js"
import { Order } from "../models/OrderSchema.js"

let fetchCounters = async (req, res) => {
    try {
        let foodCounter = await Food.countDocuments()
        let customerCounter = await Customer.countDocuments()
        let orderCounter = await Order.countDocuments()

        res.status(200).json({
            data: {
                foodCounter, customerCounter, orderCounter
            },
            message: "Fetched Counters Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching counters"
        })
    }
}


let fetchCategoryForChart = async (req, res) => {
  try {
    const data = await Order.aggregate([
      // 1. Only Delivered orders
      { $match: { status: "Delivered" } },

      // 2. Break down items array
      { $unwind: "$items" },

      // 3. Lookup food details
      {
        $lookup: {
          from: "foods", // collection name (Mongoose lowercases & pluralizes 'Food')
          localField: "items.food",
          foreignField: "_id",
          as: "foodDoc"
        }
      },

      // 4. Flatten foodDoc array
      { $unwind: "$foodDoc" },

      // 5. Calculate amount per item
      {
        $project: {
          category: "$foodDoc.category",
          amount: {
            $multiply: ["$items.quantity", "$foodDoc.price"]
          }
        }
      },

      // 6. Group by category, sum the total amount
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      },

      // 7. Rename _id to category
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalAmount: { $round: ["$totalAmount", 2] } // Optional rounding
        }
      },

      { $sort: { category: 1 } }
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching category chart data:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export {fetchCounters, fetchCategoryForChart}