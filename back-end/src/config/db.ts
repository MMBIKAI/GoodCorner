import { DataSource } from "typeorm";
import { Clothes } from "../entities/clothes"; // Ensure you have the correct path
import { Category } from "../entities/categories"; // Ensure you have the correct path
import { Tag } from "../entities/tags";
import { Picture } from "../entities/pictures";
import sqlite3 from "sqlite3";

export const dataSourceGoodCorner = new DataSource({
  type: "sqlite", // Type of database
  database: "./dataBase.sqlite", // Database file name
  entities: [Clothes, Category, Tag, Picture], // Your entities
  synchronize: true, // Automatically synchronize the database schema
  logging: ["error", "query"], // Log errors and queries for debugging
});
