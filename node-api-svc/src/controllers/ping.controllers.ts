import { Request, Response } from "express";

export function ping(req: Request, res: Response): Response {
  return res.json({ message: "node-api-svc v0.0.1 /ping" });
}