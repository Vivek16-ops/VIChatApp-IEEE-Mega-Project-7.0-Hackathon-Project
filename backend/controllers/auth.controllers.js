import User from "../models/user.model.js";
import verifyemails from "../models/verifyemails.model.js";
import CryptoJS from "crypto-js";
import generateTokenandSetCookie from "../utils/generateToken.js";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

export const signup = async (req, res) => {
    try {
        const { fullName, userName, Password, confirmPassword, Gender, email } = await req.body;

        if (Password != confirmPassword) {
            return res.json({ success: false, message: "Passwords do not match" })
        }

        const user = await User.findOne({ email: email });

        if (user) {
            return res.json({ success: false, message: "User already exists" })
        }

        const checkingUsername = await User.findOne({ userName: userName });

        if (checkingUsername) {
            return res.json({ success: false, message: "Username already taken! Try Another" })
        }

        //Hashing Password
        const hashedPassword = CryptoJS.AES.encrypt(Password, process.env.AES_SECRET).toString();

        //Radom Avatar
        const Male_Avatar = "https://avatar.iran.liara.run/public/boy"
        const Female_Avatar = "https://avatar.iran.liara.run/public/girl"

        const newUser = new User({
            fullName,
            userName,
            Password: hashedPassword,
            Gender,
            email,
            profilePic: `${Gender === "male" ? Male_Avatar : Female_Avatar}`
        })

        if (newUser) {
            //Generate tokens and save them in cookies'
            generateTokenandSetCookie(newUser._id, res);

            await newUser.save();
            return res.json({ success: true, message: "Successfully registered your credential", id: newUser._id, fullName: newUser.fullName, userName: newUser.userName, Gender: newUser.Gender, profilePic: newUser.profilePic })
        } else {
            return res.json({ success: false, message: "Invalid User Data" })
        }
    } catch (error) {
        return res.json({ success: false, message: "Error while registering your credential" })
    }
}

export const tokenSend = async (req, res) => {
    try {
        const token = uuidv4();
        const email = await req.body.email;

        if (!email) return res.json({ success: false, message: "Pleae Enter Your Email" })

        // Storing the token into the database
        const userExist = await verifyemails.findOne({ email: email })

        if (userExist) {
            // Rather than creating the new one updating the existing one with new token
            userExist.token = token
            await userExist.save()
        }
        else {
            // Creating new entries in the database 
            const newToken = new verifyemails({
                email: email,
                token: token
            })
            await newToken.save()
        }

        // Nodemailer configuration
        const message = `Welcome to ViChatApp! Your verification token is: ${token}. Use this token to complete your account creation process.`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASS
            },
        });

        const mailOptions = {
            from: process.env.GOOGLE_USER,
            to: email,
            subject: 'ViChatAPP Account Creation Token',
            text: message,
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Successfully sent verification token", token: token })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const verifyemail = async (req, res) => {
    try {
        const { email, token } = await req.body;

        if (!token) {
            return res.json({ success: false, message: "Please provide a token" })
        }

        if (!email) {
            return res.json({ success: false, message: "Please provide an email" })
        }

        const userInfo = await verifyemails.findOne({ email: email });

        if (!userInfo) {
            return res.json({ success: false, message: "Problem with your email try again" })
        }

        if (token !== userInfo.token) {
            return res.json({ success: false, message: "Mismatched Token! Please try again" })
        }

        return res.json({ success: true, message: "Successfully verified your email! Please proceed" })
    } catch (error) {
        return res.json({ success: false, message: "Error while verifying your email" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, Password } = await req.body;
        const user = await User.findOne({ email });
        let isPasswordCorrect = false;

        if (user) {
            isPasswordCorrect = CryptoJS.AES.decrypt(user.Password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8) === Password
        }

        if (!user || !isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid Email or Password" })
        }

        //Generate tokens and save them in cookies'
        generateTokenandSetCookie(user._id, res);

        return res.json({ success: true, message: "Successfully logged in", id: user._id, fullName: user.fullName, userName: user.userName, Gender: user.Gender, profilePic: user.profilePic })
    } catch (error) {
        return res.json({ success: false, message: "Error while logging in" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.json({ success: true, message: "Successfully logged out" })
    } catch (error) {
        return res.json({ success: false, message: "No User Found To be Logged Out" })
    }
}

export const forgotToken = async (req, res) => {
    try {
        const { email } = await req.body;

        if (!email) {
            return res.json({ success: false, message: "Please provide an email" })
        }

        const userExist = await verifyemails.findOne({ email: email });
        if (!userExist) {
            return res.json({ success: false, message: "User does not exist! Please create account" })
        }

        const token = uuidv4();

        //First encrypt Storing the token into the database
        const encryptedToken = CryptoJS.AES.encrypt(token, process.env.AES_SECRET).toString();
        userExist.token = encryptedToken
        await userExist.save()

        // Nodemailer configuration
        const message = `Welcome to ViChatApp! Your verification token is: ${token}. Use this token to reset your password.`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASS
            }
        });

        const mailOptions = {
            from: process.env.GOOGLE_USER,
            to: email,
            subject: 'ViChatApp Password Reset',
            text: message
        };

        await transporter.sendMail(mailOptions)

        return res.json({ success: true, message: "Successfully sent verification token" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const verficationforgotToken = async (req, res) => {
    try {
        const { email, token } = await req.body;

        if (!email || !token) {
            return res.json({ success: false, message: "Please provide an email and token" })
        }

        const userInfo = await verifyemails.findOne({ email: email });
        if (!userInfo) {
            return res.json({ success: false, message: "Problem with your email try again" })
        }

        // decrpyt the token and check if it matches
        const decryptedToken = CryptoJS.AES.decrypt(userInfo.token, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8)
        if (token !== decryptedToken) {
            return res.json({ success: false, message: "Mismatched Token! Please try again" })
        }

        return res.json({ success: true, message: "Successfully verified your email! Please proceed" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const resetpassword = async (req, res) => {
    try {
        const { email, password } = await req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Please provide an email and password" })
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist! Please create account" })
        }

        const hashedPassword = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();
        user.Password = hashedPassword;
        await user.save();
        return res.json({ success: true, message: "Successfully reset your password" })
    } catch (error) {
        res.json({ success: false, message: "Problem while resetting your password! Please try again" })
    }
}