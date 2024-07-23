import express from 'express';
import http from 'http';
import routes from './routes/routes.js';
import config from './config/config.js';
import mongoose from 'mongoose';
import helmet from 'helmet';

const app = express();
const server = http.createServer(app);
app.use(express.json());

// Security
app.use(helmet())
app.disable('x-powered-by')

// Database
mongoose
  .connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Route
app.use("/", routes);

export default app;