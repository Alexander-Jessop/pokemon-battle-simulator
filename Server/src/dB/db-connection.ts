import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

interface ExtendedConnectOptions extends mongoose.ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY_MS = 1000;

async function retryConnectToDatabase(retries: number): Promise<void> {
  const retryDelay = Math.pow(2, retries) * INITIAL_RETRY_DELAY_MS;

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

    if (retries < MAX_RETRIES) {
      console.log(`Retrying connection in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      await retryConnectToDatabase(retries + 1);
    } else {
      console.error("Max connection retries exceeded. Exiting...");
      process.exit(1);
    }
  }
}

async function connectToDatabase(): Promise<void> {
  await retryConnectToDatabase(0);
}

export default connectToDatabase;
