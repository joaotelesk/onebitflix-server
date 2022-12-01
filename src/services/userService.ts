import { User } from "../models";
import { EpisodeInstance } from "../models/Episode";
import { UserCreationAttributes } from "../models/User";

function filterLastEpisodeFromEachCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (e) => e.courseId === episode.courseId
    );

    if (episodeFromSameCourse!.order > episode.order) {
      return currentList;
    }

    const listWithoutEpisodeFromSameCourse = currentList.filter(
      (e) => e.courseId !== episode.courseId
    );
    listWithoutEpisodeFromSameCourse.push(episode);

    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}
export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },
  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);
    return user;
  },
  getKeepwatchingList: async (id: number) => {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      include: {
        association: "episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          "videoUrl",
          "secondsLong",
          "courseId",
        ],
        include: [
          {
            association: "course",
            attributes: ["id", "name", "synopsis", "thumbnailUrl"],
          },
        ],
        through: {
          as: "watchTime",
          attributes: ["seconds", "updatedAt"],
        },
      },
    });
    if (!userWithWatchingEpisodes) throw new Error("Usuário não encontrado");
    const keepWatchingList = filterLastEpisodeFromEachCourse(
      userWithWatchingEpisodes.episodes!
    );

    return keepWatchingList;
  },
};
