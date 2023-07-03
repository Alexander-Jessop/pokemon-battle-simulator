import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import dotenv from "dotenv";
dotenv.config();
var MongoDBStoreSession = MongoDBStore(session);
var sessionConfig = function (app) {
    var store = new MongoDBStoreSession({
        uri: process.env.MONGODB_URI,
        collection: "sessions",
    });
    app.use(session({
        secret: process.env.SESSIONS_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
};
export default sessionConfig;
