import { Food } from "../models/FoodSchema.js";
import { Review } from "../models/ReviewSchema.js";
import { Order } from "../models/OrderSchema.js";

let createFood = async (req, res) => {
  try {
    let filePath = req.file ? req.file.path.replace("\\", "/") : null;
    let result = await Food.create({ ...req.body, image: filePath });
    res.status(200).json({
      data: result,
      message: "Food Added Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//update
let updateFood = async (req, res) => {
  let { foodId, price } = req.body;
  let result = await Food.findByIdAndUpdate(
    { _id: foodId },
    { price: price },
    { new: true }
  );
  try {
    res.status(200).json({
      data: result,
      message: " Food Price updated Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete food
let deleteFood = async (req, res) => {
  let { foodId } = req.body;

  let result = await Food.findByIdAndDelete({ _id: foodId });
  try {
    res.status(200).json({
      data: result,
      message: "Food Deleted Sucessfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

let fetchFood = async (req, res) => {
  try {
    let result = await Food.find();
    res.status(200).json({
      data: result,
      message: "Fetched..",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchDishesWithAvgratings = async (req, res) => {
  try {
    const populatedDishes = await Food.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "food",
          as: "Reviews",
        },
      },
      {
        $addFields: {
          averageratings: {
            $cond: {
              if: { $gt: [{ $size: "$Reviews" }, 0] },
              then: { $avg: "$Reviews.rating" },
              else: 0,
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          foodname: 1,
          description: 1,
          price: 1,
          category: 1,
          image: 1,
          averageratings: 1,
        },
      },
    ]);
    res.status(200).json({ data: populatedDishes });
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchRecent = async (req, res) => {
  try {
    const recentDishes = await Food.aggregate([
      // Join with reviews
      {
        $lookup: {
          from: "reviews", // collection name in MongoDB
          localField: "_id",
          foreignField: "food",
          as: "Reviews",
        },
      },
      // Calculate average rating
      {
        $addFields: {
          averageratings: {
            $cond: {
              if: { $gt: [{ $size: "$Reviews" }, 0] },
              then: { $avg: "$Reviews.rating" },
              else: 0,
            },
          },
        },
      },
      // Project only required fields
      {
        $project: {
          _id: 1,
          foodname: 1,
          description: 1,
          price: 1,
          category: 1,
          image: 1,
          averageratings: 1,
          createdAt: 1,
        },
      },
      // Sort by most recent
      { $sort: { createdAt: -1 } },
      // Limit to 4 results
      { $limit: 4 },
    ]);

    res.status(200).json({
      data: recentDishes,
      message: "Fetched 4 most recent dishes with ratings",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recent dishes with ratings",
      error,
    });
  }
};

const fetchTopDishes = async (req, res) => {
  try {
    const topDishes = await Order.aggregate([
      { $unwind: "$items" },

      // Group by food ID and sum quantities sold
      {
        $group: {
          _id: "$items.food",
          totalSold: { $sum: "$items.quantity" },
        },
      },

      // Sort by total quantity sold (descending)
      { $sort: { totalSold: -1 } },

      // Limit to top 4
      { $limit: 4 },

      // Lookup food details
      {
        $lookup: {
          from: "foods", // collection name
          localField: "_id",
          foreignField: "_id",
          as: "food",
        },
      },
      { $unwind: "$food" },

      // Lookup average ratings from reviews
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "food",
          as: "reviews",
        },
      },

      // Calculate average rating
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviews" }, 0] },
              { $avg: "$reviews.rating" },
              0,
            ],
          },
        },
      },

      // Final projection
      {
        $project: {
          _id: "$food._id",
          foodname: "$food.foodname",
          description: "$food.description",
          price: "$food.price",
          category: "$food.category",
          image: "$food.image",
          totalSold: 1,
          averageRating: { $round: ["$averageRating", 1] },
        },
      },
    ]);

    res.status(200).json(topDishes);
  } catch (error) {
    console.error("Error fetching top dishes:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export {
  createFood,
  fetchFood,
  fetchDishesWithAvgratings,
  deleteFood,
  updateFood,
  fetchRecent,
  fetchTopDishes
};
