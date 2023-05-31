import mongoose from "mongoose";

interface ExtendedConnectOptions extends mongoose.ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

async function connectToDatabase() {
  try {
    const uri = process.env.MONGODB_URI!;
    const options: ExtendedConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, options);
    console.log("Connected to database");
  } catch (error: any) {
    console.error("Error connecting to database:", (error as Error).message);
  }
}

export default connectToDatabase;
