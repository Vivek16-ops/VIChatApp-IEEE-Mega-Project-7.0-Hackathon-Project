import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },
    Gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    profilePic: {
        type: String,
        default: ""
    },
    friends: [friendSchema] // Array of friend objects with friendId and status
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;