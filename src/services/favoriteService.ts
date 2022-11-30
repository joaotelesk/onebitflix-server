import { Favorite } from "../models/Favorite";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    const favorites = await Favorite.create({
      userId,
      courseId,
    });

    return favorites;
  },
  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: {
        userId,
      },
      include: {
        association: "course",
        attributes: ["id", "name", "synopsis", "thumbnailUrl"],
      },
    });

    const courses = favorites.map((favorite) => favorite.course);

    return {
      userId,
      amount: favorites.length,
      courses,
    };
  },
  delete: async (userId: number, courseId: number) => {
    await Favorite.destroy({
      where: {
        userId,
        courseId,
      },
    });
  },
  isFavorited: async (userId: number, courseId: number) => {
    const favorite = await Favorite.findOne({
      where: {
        userId,
        courseId,
      },
    });
    return favorite !== null ? true : false;
  },
};
