import { Food } from "../models/FoodSchema.js";
import { Review } from "../models/ReviewSchema.js";

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
    res.status(200).json(error);
  }
};

export {
  createFood,
  fetchFood,
  fetchDishesWithAvgratings,
  deleteFood,
  updateFood,
};
