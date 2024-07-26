import app from "./app.js";
import config from "./config/config.js";
import logger from "./utils/logger.js";

const PORT = config.port || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});