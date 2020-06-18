import App from "./app";

import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";

import HomeController from "./controllers/home.controller";

const app = new App({
  port: process.env.PORT || 5000,
  controllers: [new HomeController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    morgan("dev"),
    express.urlencoded({ extended: false }),
    session({
      secret: "mysecretsession",
      resave: false,
      saveUninitialized: false,
    }),
    flash(),
    passport.initialize(),
    passport.session(),
    (req: Request, res: Response, next: express.NextFunction) => {
      req.flash("signupMessage");
      next();
    },
  ],
});

import "./database";
import "./passport/local-auth";

app.listen();
