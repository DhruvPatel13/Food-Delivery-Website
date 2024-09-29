import foodModel from "../models/foodModel.js";
import foodOfferModel from "../models/foodOfferModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Food Not Added" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error loading foods" });
  }
};

// remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, (e) => {
      if (e) console.log(e);
    });
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Food Not Removed" });
  }
};

// add offers, working
const addOffer = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Image is required" });
  }
  let image_filename = `${req.file.filename}`;
  const foodOffer = new foodOfferModel({
    name: req.body.name,
    description: req.body.description,
    old_price: req.body.old_price,
    new_price: req.body.new_price,
    specialOffer: req.body.specialOffer,
    image: image_filename,
  });
  try {
    await foodOffer.save();
    res.json({ success: true, message: "Offer Added" });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Offer Not Added" });
  }
};
// get offers, working
const offerList = async (req, res) => {
  try {
    const offers = await foodOfferModel.find({});
    res.json({ success: true, data: offers });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error loading offers" });
  }
};
// remove offers, working..
const removeOffer = async (req, res) => {
  try {
    const offer = await foodOfferModel.findById(req.body.id);
    if (!offer) {
      return res.status(404).json({ success: false, message: "Offer not found" });
    }
    fs.unlink(`uploads/${offer.image}`, (e) => {
      if (e) console.log("failed to delete image:", e);
    });
    await foodOfferModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Offer Removed" });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Failed To Removed Offer" });
  }
};
export { addFood, listFood, removeFood, addOffer, removeOffer, offerList };
