import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember,
} from "../controllers/projectcontroller.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();

/* =========================================================
   PROJECTS
========================================================= */

router.get(
  "/",
  protect,
  getProjects
);

router.post(
  "/",
  protect,
  createProject
);

router.get(
  "/:projectId",
  protect,
  getProjectById
);

router.put(
  "/:projectId",
  protect,
  updateProject
);

router.delete(
  "/:projectId",
  protect,
  deleteProject
);

/* =========================================================
   MEMBERS
========================================================= */

router.post(
  "/:projectId/members",
  protect,
  addProjectMember
);

router.delete(
  "/:projectId/members/:userId",
  protect,
  removeProjectMember
);

export default router;
