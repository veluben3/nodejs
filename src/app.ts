import express from "express";
import compression from "compression"
import cors from "cors"
import routes from "./routes";
import passport from 'passport';
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors())
app.use(passport.initialize());
app.use('/api', routes)

export default app;