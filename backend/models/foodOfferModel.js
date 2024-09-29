import mongoose from "mongoose";
import { Schema } from "mongoose";

const foodOfferSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  old_price: { type: Number, required: true },
  new_price: { type: Number, required: true },
  image: { type: String, required: true },
  specialOffer: { type: Boolean, default: true },
});

const foodOfferModel =
  mongoose.models.foodOffer || mongoose.model("foodOffer", foodOfferSchema);

export default foodOfferModel;
