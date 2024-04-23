import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import hpp from "hpp";
import { expirationCron } from "./cron";
import tikeetiDatasource from "./datasource/tikeeti.datasource";
import { errorHandler } from "./middlewares/error-handler";
import modules from "./modules";
import { errorLogger, infoLogger } from "./utils/logger";
import { rateLimiter } from "./utils/rate-limiter";

const app = express();
const PORT = process.env.PORT! || '8000';

// disbale express default x-powered-by header
app.disable("x-powered-by");

// set the maximum request size to 10mb
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// prevent again http paramter pollution
app.use(hpp());

// cross-origin resource sharing
app.use(cors());

// helps secure express app by setting http response headers 
app.use(helmet());

// setup rate limiter
app.use(rateLimiter);

// test route
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Server is running"
  });
});

app.use(modules);

// custom middleware to check if route exists
app.use((_req, res) => {
  res.status(404).json({
    message: "This route does not exist"
  });
});

// call the error handler middleware
app.use(errorHandler);

// graceful shutdown
async function gracefulShutdown() {
  try {
    // initialize datasource
    await tikeetiDatasource.initialize();
    infoLogger("tikeeti datasource initialized successfully");
  } catch (err) {
    errorLogger("an error occurred while initializing tikeeti datasource", {
      reason: (err as Error).message
    });
  }

  const server = app.listen(PORT, () => {
    infoLogger(`Assessment server is running on port ${PORT}`);
  });

  const shutdown = () => server.close(async () => {
    try {
      // destroy connections during shutdown
      await tikeetiDatasource.destroy();
      expirationCron.stop();
      infoLogger("database and cron closed successfully");
      infoLogger("server shutdown successfully");
      process.exit();
    } catch (err) {
      errorLogger("an error occurred while shutting down server", {
        reason: (err as Error).message
      });
      process.exit(1);
    }
  });


  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

gracefulShutdown();
