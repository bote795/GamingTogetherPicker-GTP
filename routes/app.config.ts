import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
export class AppsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AppRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/apps`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`List of apps`);
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send(`Post to apps`);
      });

    this.app
      .route(`/apps/:appId`)
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          // this middleware function runs before any request to /apps/:appId
          // but it doesn't accomplish anything just yet---
          // it simply passes control to the next applicable function below using next()
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.appId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.appId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id ${req.params.appId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.appId}`);
      });

    return this.app;
  }
}
