import express from "express";

import {
  createTask,
  getProjectTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();

/* =========================================================
   CREATE
========================================================= */

router.post(
  "/",
  protect,
  createTask
);

/* =========================================================
   GET PROJECT TASKS
========================================================= */

router.get(
  "/project/:projectId",
  protect,
  getProjectTasks
);

/* =========================================================
   UPDATE STATUS
========================================================= */

router.put(
  "/:taskId/status",
  protect,
  updateTaskStatus
);

/* =========================================================
   UPDATE TASK
========================================================= */

router.put(
  "/:taskId",
  protect,
  updateTask
);

/* =========================================================
   DELETE TASK
========================================================= */

router.delete(
  "/:taskId",
  protect,
  deleteTask
);

export default router;
