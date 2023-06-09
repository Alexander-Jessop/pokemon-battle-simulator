import { Application } from "express";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

import dotenv from "dotenv";
dotenv.config();

const MongoDBStoreSession = MongoDBStore(session);

const sessionConfig = (app: Application) => {
  const store = new MongoDBStoreSession({
    uri: process.env.MONGODB_URI!,
    collection: "sessions",
  });

  app.use(
    session({
      secret: process.env.SESSIONS_SECRET_KEY!,
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
};

export default sessionConfig;
