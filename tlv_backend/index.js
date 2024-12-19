import logger from "./services/logger.service.js";
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { config } from "./data/configs/index.js";
import { securityMiddleware } from "./middleware/security.js";
import routes from "./routes/routes.js";

const initializeServer = async () => {
  try {
    // Initialize Server with middleware
    const app = express();

    // 1. Basic middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 2. CORS configuration
    app.use(securityMiddleware);

    // 3. Static files
    app.use(express.static("public"));
    app.use(express.static("src"));

    // 4. Routes
    app.use('/whoisserver',routes);

    // 5. Error handler should be last
    app.use(errorHandler);

    // Start server
    app.listen(config.app.port, () => {
      logger.info(`Server running on port ${config.app.port}`);
    });

    return app; // Export for testing purposes
  } catch (error) {
    logger.error(`Failed to initialize app: ${error.message}`);
    process.exit(1);
  }
};

// Start the Server
initializeServer();

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection:", error);
  process.exit(1);
});

export { initializeServer }; // Export for testing purposes
