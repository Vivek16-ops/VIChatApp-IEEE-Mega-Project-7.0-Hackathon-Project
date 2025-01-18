import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDb = async () => {
    try
    {
        await mongoose.connect(process.env.MONGO_URI);
    }
    catch(error)
    {
        console.log("error while connecting to the Database: ",error.message)
    }
};

export default connectMongoDb;