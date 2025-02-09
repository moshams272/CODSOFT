import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getProject,
  getAllProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";

const router = express.Router();
router
  .route("/:_id")
  .get(verifyToken, getProject)
  .patch(verifyToken, updateProject)
  .delete(verifyToken, deleteProject);

router
  .route("/")
  .get(verifyToken, getAllProject)
  .post(verifyToken, createProject);
  
export default router;