import { Request, Response, Router } from "express";
import customerModel from "../../models/customer";
import bcrypt from "bcrypt";

const customerRouter: Router = Router();
// @desc Create a new Seller
customerRouter.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10); //hashing the password
  const customer = new customerModel({
    username: req.body.username,
    password: hashedPassword,
    created_at: Date.now(),
  });
  try {
    //check if customer username exists before
    const existingCustomer = await customerModel.findOne({
      username: customer.username,
    });
    //returns 400 if customer already exists
    if (existingCustomer) {
      return res.status(400).json({ message: "Username already exists" });
    } else {
      const newCustomer = await customer.save();
      res.status(201).json(newCustomer);
      res.end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

customerRouter.post("/login", async (req, res) => {
  const customer = {
    username: req.body.username,
    password: req.body.password,
  };
  //check if the user exits
  const existingCustomer = await customerModel.findOne({
    username: customer.username,
  });
  if (existingCustomer) {
    //check if the password tallies with the inputed password
    const isMatch = await bcrypt.compare(
      customer.password,
      existingCustomer.password
    );
    if (isMatch) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

export default customerRouter;
