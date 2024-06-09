import express from "express";
import { createCategories, deleteCategories, getAllCategories, updateCategories } from "../controllers/category.controller";
import { authenticationMiddleware } from "../middleware";

export const categoryRoutes = express.Router();


categoryRoutes.use(authenticationMiddleware);
categoryRoutes.route("/").get(getAllCategories);
categoryRoutes.route("/create").post(createCategories);
categoryRoutes.route("/category/:id").delete(deleteCategories);
categoryRoutes.route("/update").put(updateCategories);
