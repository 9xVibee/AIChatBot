import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      // Cluster database name
      dbName: "AiChatBot",
    });

    // After successfully connected to mongodb Display this message!
    console.log(`MongoDb Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    throw new Error("Can't connect to MongoDb");
  }
}

async function disconnecFromDatabase() {
  try {
    // Disconnecting to mongoDb
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Can't disconnect to MongoDb");
  }
}

export { connectToDatabase, disconnecFromDatabase };
