import express from 'express';
import http from 'http';
import routes from './routes/routes.js';
import config from './config/config.js';
import mongoose from 'mongoose';
import helmet from 'helmet';
import swaggerUi from "swagger-ui-express";
import logger from './utils/logger.js';
import swaggerDocument from './swagger.json' assert { type: 'json' };

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



// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

// Route
app.use("/", routes);



export default app;