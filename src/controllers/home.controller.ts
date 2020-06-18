import * as express from "express";
import { Request, Response } from "express";

import passport from "passport";

class HomeController {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.index);
    this.router.get("/signup", this.signup);
    this.router.post(
      "/signup",
      passport.authenticate("local-signup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        passReqToCallback: true,
      })
    );
    this.router.get("/profile", this.profile);
  }

  index = (req: Request, res: Response) => {
    res.render("index");
  };

  signup = (req: Request, res: Response) => {
    res.render("signup");
  };

  profile = (req: Request, res: Response) => {
    res.render("profile");
  };
}

export default HomeController;
