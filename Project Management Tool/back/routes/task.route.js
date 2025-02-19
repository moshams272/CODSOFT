import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getTask,
  getAllTasksForUser,
  updateTaskStatusForUser,
  updateTaskForManager,
  deleteTask,
  createTask,
  getAllTasksForProject,
  assignTask,
  unassignTask
} from "../controller/task.controller.js";
const router = express.Router();

router.route("/user").get(verifyToken,getAllTasksForUser);
router.route("/user/:_id").patch(verifyToken, updateTaskStatusForUser);
router.route("/:_id").get(verifyToken, getTask);



router
  .route("/manager/:_id")
  .patch(verifyToken, updateTaskForManager)
  .delete(verifyToken, deleteTask);

router.route("/manager").post(verifyToken, createTask);

router.route("/manager/all/:_id").get(verifyToken, getAllTasksForProject);

router.route("/manager/assign/:_id").patch(verifyToken,assignTask);
router.route("/manager/unassign/:_id").patch(verifyToken,unassignTask);
export default router;
