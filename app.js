import express from 'express';
import http from 'http';
import routes from './routes/routes.js';
import {dbUri} from './config/config.js';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
app.use(express.json());

// Security
app.use(helmet())
app.disable('x-powered-by')

// Database
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Route
app.use("/", routes);

module.exports = app;