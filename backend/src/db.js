import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME, // Explicitly set the DB name
    });
    console.log(`MongoDB connected !! DB Host : ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log(`MongoDB connection failed ${error}`)
  }
}

export default connectDB