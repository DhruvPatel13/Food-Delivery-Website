import express from "express";
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder, handleOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders",authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/orderpermission", handleOrder);
orderRouter.post("/status", updateStatus);

export default orderRouter;
