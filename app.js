import express from 'express';
import http from 'http';
import routes from './routes/routes.js';
import config from './config/config.js';
import mongoose from 'mongoose';
import helmet from 'helmet';
import logger from './utils/logger.js';

const app = express();
const server = http.createServer(app);
app.use(express.json());

// Security
app.use(helmet())
app.disable('x-powered-by')

// Database
mongoose
  .connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Could not connect to MongoDB", err));

// Route
app.use("/", routes);

export default app;