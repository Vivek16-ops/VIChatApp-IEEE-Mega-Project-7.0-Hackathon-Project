import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.json({ success: false, message: "Unauthorized - No Token Provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.json({ success: false, message: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.userID).select("-Password")

        if (!user) {
            return res.json({ success: false, message: "Unauthorized - User Not Found" })
        }

        req.user = user
        next()
    } catch (error) {
        return res.json({ success: false, message: "Error while sending message" })
    }
}

export default protectRoute;