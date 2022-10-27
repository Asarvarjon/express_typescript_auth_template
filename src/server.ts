import cors from "cors";
import express, { Express, Router } from 'express';
import errorHandler from "./modules/shared/middlewares/errorHandler";
import morgan from 'morgan';
import expressFileUpload from 'express-fileupload';
import path from "path";

class App {
  public app: Express;

  constructor(router: Router) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes(router);
    this.initializeErrorHandling();
  }

  public get getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(expressFileUpload())
    this.app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")))
    this.app.use(morgan("tiny"))

  }

  private initializeRoutes(router: Router) {
    this.app.use('/api', router);
  }
  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

}

export default App;
