import mongoose from "mongoose";

const dbConnected = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected successfully')

    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // ⛔ Stop the server if DB fails
    }
}

export default dbConnected