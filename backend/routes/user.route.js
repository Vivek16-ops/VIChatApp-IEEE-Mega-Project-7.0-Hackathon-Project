import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar, addUserFriendsFunction, friendRequestsFunction, acceptRejectFriendRequestFunction } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserForSidebar);
router.post("/addUserFriend", protectRoute, addUserFriendsFunction);
router.post("/friendRequestsFunction", protectRoute, friendRequestsFunction);
router.post("/acceptRejectFriendRequestFunction", protectRoute, acceptRejectFriendRequestFunction);

export default router