import { Application } from "express";
import ping from "./ping.routes";
import conversationRoutes from "./conversation.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/", ping);
    app.use("/conversations", conversationRoutes);
  }
}