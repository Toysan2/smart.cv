import mongoose from "mongoose";

const connection = {}; // This object holds the connection state throughout the life of the application

async function dbConnect() {
  // If a connection already exists, use it
  if (connection.isConnected) {
    return;
  }

  // Use the environment variable to store the MongoDB URL
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new engine to discover and monitor servers
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    connectTimeoutMS: 10000, // Timeout for initial connection attempts
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
