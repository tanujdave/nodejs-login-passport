import express from "express";
import { Application } from "express";
import * as path from "path";

const engine = require("ejs-mate");

class App {
  public app: Application;
  public port: number | string;

  constructor(appInit: {
    port: number | string;
    middleWares: any;
    controllers: any;
  }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
    this.template();
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private assets() {
    this.app.use(express.static("public"));
    this.app.use(express.static("views"));
  }

  private template() {
    this.app.set("views", path.join(__dirname, "views"));
    this.app.engine("ejs", engine);
    this.app.set("view engine", "ejs");
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port http://localhost:${this.port}`);
    });
  }
}

export default App;
