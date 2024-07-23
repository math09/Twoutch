import express from 'express';
import http from 'http';
import routes from './routes/routes';

const port = 3000;
const app = express();
const server = http.createServer(app);
app.use(express.json());

// Security
app.use(helmet())
app.disable('x-powered-by')

// Route
app.use("/", routes);

// Start server
server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
