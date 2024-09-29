import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  addOffer,
  removeOffer,
  offerList,
} from "../controllers/foodControllers.js";
import multer from "multer";

const foodRouter = express.Router();

//image storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post(
  "/addoffer",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res
          .status(400)
          .json({ success: false, message: "File upload failed" });
      }
      next();
    });
  },
  addOffer
);
foodRouter.get("/offerlist", offerList);
foodRouter.post("/removeoffer", removeOffer);

export default foodRouter;
