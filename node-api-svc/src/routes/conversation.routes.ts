import { Router } from "express";
import ConversationController from "../controllers/conversation.controllers";

class ConversationRoutes {
  router = Router();
  controller = new ConversationController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create 
    this.router.post("/", this.controller.create);

    // Retrieve data 
    this.router.get("/:sender", this.controller.findBySender);
  }
}

export default new ConversationRoutes().router;