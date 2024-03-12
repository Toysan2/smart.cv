import mongoose from "mongoose";

const connection = {}; // Ten obiekt przechowuje stan połączenia w trakcie życia aplikacji

async function dbConnect() {
  // Jeśli już istnieje połączenie, użyj go
  if (connection.isConnected) {
    return;
  }

  // Użyj zmiennej środowiskowej do przechowywania URL do MongoDB
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
