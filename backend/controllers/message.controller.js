import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketID } from "../socket/socket.js";
import { io } from "../socket/socket.js";
import CryptoJS from "crypto-js";

//For Normal Decryption
function decryptMessages(conversation) {
    return conversation.messages.map(msg => {
        const decryptedMessage = CryptoJS.AES.decrypt(msg.message, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);
        return {
            _id: msg._id.toString(),
            senderID: msg.senderID.toString(),
            recieverID: msg.recieverID.toString(),
            message: decryptedMessage,
            createdAt: msg.createdAt.toString(),
            updatedAt: msg.updatedAt.toString()
        };
    });
}

//For real time socket io decryption
async function decryptMessages2(data) {
    const decryptedMessage = CryptoJS.AES.decrypt(data.message, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);
    return {
        _id: data._id.toString(),
        senderID: data.senderID.toString(),
        recieverID: data.recieverID.toString(),
        message: decryptedMessage,
        createdAt: data.createdAt.toString(),
        updatedAt: data.updatedAt.toString()
    };
}

// Sending Message API 
export const sendMessage = async (req, res) => {
    try {
        const { message } = await req.body
        const { id: recieverID } = await req.params
        const senderID = await req.user._id

        let conversation = await Conversation.findOne({ participants: { $all: [senderID, recieverID] } })

        if (!conversation) {
            conversation = await Conversation.create({ participants: [senderID, recieverID] })
        }

        //Encrypting the Messages
        const encryptedMessage = CryptoJS.AES.encrypt(message, process.env.AES_SECRET).toString();

        const newMessage = new Message({ senderID, recieverID, message: encryptedMessage })

        if (newMessage) {
            conversation.messages.push(newMessage)
        }

        // This below line of code takes little long to execute
        // await newMessage.save()
        // await conversation.save()

        // Instead we can do this 
        await Promise.all([newMessage.save(), conversation.save()])

        const decryptedInfo = await decryptMessages2(newMessage)
        // Socket IO Funtionality will go here 
        const recieverSocketId = getRecieverSocketID(recieverID);
        if (recieverSocketId) {
            //io.to(socket_id).emit() used to send events to specific client by socket_id
            io.to(recieverSocketId).emit("newMessage", decryptedInfo);
        }

        return res.json({ success: true, message: "Sent", newMessage: decryptedInfo });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Getting All Messages API
export const getMessages = async (req, res) => {
    try {
        const { id: userTochatID } = req.params;
        const senderID = req.user._id;

        const conversation = await Conversation.findOne({ participants: { $all: [senderID, userTochatID] } }).populate("messages");

        if (!conversation) return res.status(200).json({ success: true, messages: [] });

        const encryptedMessages = conversation.messages

        const decryptedMessages = decryptMessages({ messages: encryptedMessages });

        return res.status(200).json({ success: true, messages: decryptedMessages });
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}