import { Favorite } from "../models/Favorite";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    const favorite = await Favorite.create({
      userId,
      courseId,
    });

    console.log(userId);
    console.log(courseId);
    return favorite;
  },
};
