import mongoose from "mongoose";

const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting with database", error.message);
    }
}

export default Connection; 