import app from "./app";
import config from "./config/config";
import mongoose from "mongoose";
import {logger} from "./config/logger";

let server;

const db = mongoose.connection;

const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost", {
            dbName: "projects"
        })
        logger.info(`connected to MongoDB`)
        app.listen(config.PORT, config.HOST, () => {
            logger.info('Server UP and Running')
        });
    } catch (e) {
        logger.error(`MongoDB connection error: ${e}`)
    }
}

connect();


