import Express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Express.Router();

router.post("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
export default router