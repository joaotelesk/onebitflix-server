import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { episodeSercice } from "../services/episodeService";

export const episodesController = {
  // GET /episodes/stream?videoUrl=
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;
    const range = req.headers.range;

    try {
      if (typeof videoUrl !== "string") {
        throw new Error("videoUrl must be of type 'string'");
      }

      episodeSercice.streamEpisodeToResponse(res, videoUrl, range);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  // GET /episodes/:id/watchTime
  getWathTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const episodeId = req.params.id;
    try {
      const watchTime = await episodeSercice.getWatchTime(
        userId,
        Number(episodeId)
      );
      return res.status(201).json(watchTime);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  // POST /episodes/:id/watchTime
  setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const episodeId = Number(req.params.id);
    const { seconds } = req.body;
    try {
      const watchTime = await episodeSercice.setWatchTime({
        episodeId,
        seconds,
        userId,
      });
      return res.status(201).json(watchTime);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
