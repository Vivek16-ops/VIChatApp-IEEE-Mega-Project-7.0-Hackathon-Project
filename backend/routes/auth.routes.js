import express from "express";
import { login, logout, signup, verifyemail, tokenSend, forgotToken, verficationforgotToken, resetpassword } from "../controllers/auth.controllers.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login)

router.post("/logout", logout)

router.post("/tokenSend", tokenSend)

router.post("/verifyemail", verifyemail)

router.post("/sendForgotToken", forgotToken)

router.post("/verficationforgotToken", verficationforgotToken)

router.post("/resetpassword", resetpassword)

export default router;