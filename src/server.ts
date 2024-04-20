import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import tikeetiDatasource from "./datasource/tikeeti.datasource";
import { errorHandler } from "./middlewares/error-handler";

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

// test route
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Server is running"
  });
});

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
    console.log("tikeeti datasource initialized successfully");
  } catch (err) {
    console.log(
      "an error occurred while initializing tikeeti datasource",
      err.message
    );
  }

  const server = app.listen(PORT, () => {
    console.log(`Assessment server is running on port ${PORT}`);
  });

  const shutdown = () => server.close(async () => {
    try {
      // destroy connections during shutdown
      await tikeetiDatasource.destroy();
      console.log("database closed successfully");
      console.log("server shutdown successfully");
      process.exit();
    } catch (err) {
      console.log("an error occurred while shutting down server", err.message);
      process.exit(1);
    }
  });


  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

gracefulShutdown();
