import express from 'express';
import http from 'http';
import routes from './routes/routes';

const app = express();
const server = http.createServer(app);
app.use(express.json());

// Security
app.use(helmet())
app.disable('x-powered-by')

// Route
app.use("/", routes);

// Start server
server.listen(3000, () => {
  logger.info(`Server is running on port ${3000}`);
});
