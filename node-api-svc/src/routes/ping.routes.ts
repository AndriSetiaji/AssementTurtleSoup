import { Router } from "express";
import { ping } from "../controllers/ping.controllers";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/ping", ping);
  }
}

export default new HomeRoutes().router;