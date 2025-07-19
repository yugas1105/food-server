import { Customer } from "../models/CustomerSchema.js";
import bcrypt from "bcryptjs";

let createCustomer = async (req, res) => {
  let reqData = req.body;
  try {
    let { password } = reqData;
    let saltKey = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, saltKey);

    let result = await Customer.create({
      ...reqData,
      password: encryptedPassword,
    });
    res.status(200).json({
      data: result,
      message: "Customer Added Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

let doLogin = async (req, res) => {
  let { email, password } = req.body;
  try {
    let logedCustomer = await Customer.findOne({ email });
    if (logedCustomer) {
      let isMatch = await bcrypt.compare(password, logedCustomer.password);
      if (isMatch) {
        res.status(200).json({
          data: logedCustomer,
          message: "Login Successful",
        });
      } else {
        res.status(500).json({
          message: "Invalid Password",
        });
      }
    } else {
      res.status(500).json({
        message: "Customer Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

let fetchAllCustomers = async (req, res) => {
  try {
    let result = await Customer.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

let deleteCustomer = async (req, res) => {
  try {
    let { customerId } = req.body;
    let result = await Customer.findByIdAndDelete({ _id: customerId });
    res.status(200).json({
      message: "Customer Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

let updateCutomer = async (req, res) => {
  let { customerId, password } = req.body;
  let result = await Customer.findByIdAndUpdate(
    { _id: customerId },
    { password: password },
    { new: true }
  );
  try {
    res.status(200).json({
      data: result,
      message: "Customer Password Updated",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createCustomer,
  fetchAllCustomers,
  deleteCustomer,
  updateCutomer,
  doLogin,
};
