import express from 'express';
import { authenticationMiddleware } from '../middleware';
import { createTask, getAllTasks, toogleTaskStatus, getAllTasksByCategory,getAllTasksCompleted,getTaskForToday, editTask, deleteTasks } from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddleware);

taskRoutes.route("/").get(getAllTasks);
taskRoutes.route("/tasks-by-categories/:id").get(getAllTasksByCategory);
taskRoutes.route("/today").get(getTaskForToday);

taskRoutes.route("/create").post(createTask);
taskRoutes.route("/completes").get(getAllTasksCompleted);
taskRoutes.route("/update/:id").put(toogleTaskStatus)
taskRoutes.route("/edit/:id").put(editTask);
taskRoutes.route("/:id").delete(deleteTasks)

export default taskRoutes;