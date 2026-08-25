import express from "express";

import {
  createTask,
  getProjectTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// CREATE TASK
// POST /api/tasks
// =====================================================

router.post(
  "/",
  protect,
  createTask
);


// =====================================================
// GET PROJECT TASKS
// GET /api/tasks/project/:projectId
// =====================================================

router.get(
  "/project/:projectId",
  protect,
  getProjectTasks
);


// =====================================================
// UPDATE TASK STATUS
// PUT /api/tasks/:taskId/status
// =====================================================

router.put(
  "/:taskId/status",
  protect,
  updateTaskStatus
);


// =====================================================
// UPDATE TASK
// PUT /api/tasks/:taskId
// =====================================================

router.put(
  "/:taskId",
  protect,
  updateTask
);


// =====================================================
// DELETE TASK
// DELETE /api/tasks/:taskId
// =====================================================

router.delete(
  "/:taskId",
  protect,
  deleteTask
);


export default router;
