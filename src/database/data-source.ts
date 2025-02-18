import "dotenv/config";
import { DataSource } from "typeorm";
import { CreatePostsTable1738464944384 } from "./migrations/1738464944384-create-posts-table";
import { CreateCategoriesTable1738465394885 } from "./migrations/1738465394885-create-categories-table";
import { CreatePostCategoriesTablePivot1738465543750 } from "./migrations/1738465543750-create-post-categories-table-pivot";
import { AddTimestampToCategory1739464972585 } from "./migrations/1739464972585-add_timestamp_to_category";
import { AddTimestampToPostCategoryPivot1739465084940 } from "./migrations/1739465084940-add_timestamp_to_post_category_pivot";
import { CreateUsersTable1739487049898 } from "./migrations/1739487049898-create-users-table";
import Post from "../app/entities/Post";
import Category from "../app/entities/Category";
import PostCategoryPivot from "../app/entities/PostCategoryPivot";
import User from "../app/entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Post, Category, PostCategoryPivot, User],
  migrations: [
    CreatePostsTable1738464944384,
    CreateCategoriesTable1738465394885,
    CreatePostCategoriesTablePivot1738465543750,
    AddTimestampToCategory1739464972585,
    AddTimestampToPostCategoryPivot1739465084940,
    CreateUsersTable1739487049898,
  ],
  subscribers: [],
});
