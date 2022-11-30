import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { LikeService } from "../services/likeService";

export const LikesController = {
  // POST /likes
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;
    try {
      const like = await LikeService.create(userId, courseId);
      return res.status(201).json(like);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
