import express from "express";
import * as http from "http";

import * as winston from "winston";
import * as expressWinstron from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { AppsRoutes } from "./routes/app.config";
import debug from "debug";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000 || process.env.PORT;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());

app.use(cors());

const loggerOptions: expressWinstron.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (process.env.DEBUG) {
  process.on("unhandledRejection", function (reason) {
    debugLog("unhandled Rejection:", reason);
    process.exit(1);
  });
} else {
  loggerOptions.meta = false;
}

app.use(expressWinstron.logger(loggerOptions));

routes.push(new AppsRoutes(app));

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`server up and running!`);
});

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
