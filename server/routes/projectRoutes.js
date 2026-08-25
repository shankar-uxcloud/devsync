import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  addProjectMember,
  removeProjectMember,
} from "../controllers/projectcontroller.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// PROJECT ROUTES
// =====================================================

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


// =====================================================
// TEAM MEMBER ROUTES
// =====================================================

// Add member by email
router.post(
  "/:projectId/members",
  protect,
  addProjectMember
);

// Remove member
router.delete(
  "/:projectId/members/:userId",
  protect,
  removeProjectMember
);

export default router;