import mongoose from "mongoose";

const verifyemailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    }
});

const emailVerificationModel = mongoose.model('verfiyUseremails', verifyemailsSchema);

export default emailVerificationModel;