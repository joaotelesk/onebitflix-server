import { Category } from "./Category";
import { Course } from "./Course";

Course.belongsTo(Category);
Category.hasMany(Course);

export { Course, Category };
