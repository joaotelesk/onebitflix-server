import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";
import { Favorite } from "./Favorite";

Category.hasMany(Course);

Course.belongsTo(Category);
Course.belongsToMany(User, { through: Favorite });
Course.belongsToMany(User, { through: Favorite });
Course.hasMany(Favorite, { as: "favoritesUsers", foreignKey: "course_id" });

Episode.belongsTo(Course);

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.hasMany(Favorite, { as: "favoritesCourses", foreignKey: "user_id" });

export { Category, Course, Episode, Favorite, User };
