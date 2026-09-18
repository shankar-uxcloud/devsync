import mongoose from "mongoose";

import Project from "../models/Project.js";
import User from "../models/User.js";

/* =========================================================
   CREATE PROJECT
========================================================= */

export const createProject = async (
  req,
  res
) => {
  try {
    const {
      name,
      description,
      type,
      technologies,
      dueDate,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Project name is required",
      });
    }

    if (
      dueDate &&
      Number.isNaN(
        new Date(dueDate).getTime()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid project due date",
      });
    }

    const project =
      await Project.create({
        name: name.trim(),
        description:
          description?.trim() || "",
        type:
          type?.trim() ||
          "College Project",
        technologies:
          Array.isArray(technologies)
            ? technologies
            : [],
        dueDate:
          dueDate || null,
        owner: req.user._id,
        members: [req.user._id],
      });

    const populatedProject =
      await Project.findById(
        project._id
      )
        .populate(
          "owner",
          "name email avatar role"
        )
        .populate(
          "members",
          "name email avatar role"
        );

    return res.status(201).json({
      success: true,
      message:
        "Project created successfully",
      project: populatedProject,
    });
  } catch (error) {
    console.error(
      "CREATE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create project",
    });
  }
};

/* =========================================================
   GET PROJECTS
========================================================= */

export const getProjects = async (
  req,
  res
) => {
  try {
    const projects =
      await Project.find({
        $or: [
          {
            owner: req.user._id,
          },
          {
            members: req.user._id,
          },
        ],
      })
        .sort({
          updatedAt: -1,
        })
        .populate(
          "owner",
          "name email avatar role"
        )
        .populate(
          "members",
          "name email avatar role"
        );

    return res.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(
      "GET PROJECTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to load projects",
    });
  }
};

/* =========================================================
   GET PROJECT BY ID
========================================================= */

export const getProjectById = async (
  req,
  res
) => {
  try {
    const {
      projectId,
    } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        projectId
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid project ID",
      });
    }

    const project =
      await Project.findOne({
        _id: projectId,
        $or: [
          {
            owner: req.user._id,
          },
          {
            members: req.user._id,
          },
        ],
      })
        .populate(
          "owner",
          "name email avatar role"
        )
        .populate(
          "members",
          "name email avatar role"
        );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found or access denied",
      });
    }

    return res.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      "GET PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to load project",
    });
  }
};

/* =========================================================
   UPDATE PROJECT
========================================================= */

export const updateProject = async (
  req,
  res
) => {
  try {
    const {
      projectId,
    } = req.params;

    const project =
      await Project.findById(
        projectId
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    if (
      !project.isOwner(
        req.user._id
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only the project owner can update this project",
      });
    }

    const {
      name,
      description,
      type,
      technologies,
      dueDate,
      status,
    } = req.body;

    if (
      name !== undefined
    ) {
      if (!name?.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Project name cannot be empty",
        });
      }

      project.name =
        name.trim();
    }

    if (
      description !==
      undefined
    ) {
      project.description =
        String(
          description || ""
        ).trim();
    }

    if (
      type !== undefined
    ) {
      project.type =
        String(type || "")
          .trim() ||
        "College Project";
    }

    if (
      technologies !==
      undefined
    ) {
      project.technologies =
        Array.isArray(
          technologies
        )
          ? technologies
          : [];
    }

    if (
      dueDate !== undefined
    ) {
      project.dueDate =
        dueDate || null;
    }

    if (
      status !== undefined
    ) {
      const allowed = [
        "Active",
        "In Progress",
        "Completed",
        "Archived",
        "Planning",
        "Review",
      ];

      if (
        !allowed.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid project status",
        });
      }

      project.status =
        status;
    }

    await project.save();

    const updatedProject =
      await Project.findById(
        project._id
      )
        .populate(
          "owner",
          "name email avatar role"
        )
        .populate(
          "members",
          "name email avatar role"
        );

    return res.json({
      success: true,
      message:
        "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error(
      "UPDATE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update project",
    });
  }
};

/* =========================================================
   DELETE PROJECT
========================================================= */

export const deleteProject = async (
  req,
  res
) => {
  try {
    const {
      projectId,
    } = req.params;

    const project =
      await Project.findById(
        projectId
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    if (
      !project.isOwner(
        req.user._id
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only the project owner can delete this project",
      });
    }

    await Project.deleteOne({
      _id: projectId,
    });

    return res.json({
      success: true,
      message:
        "Project deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE PROJECT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete project",
    });
  }
};

/* =========================================================
   ADD MEMBER
========================================================= */

export const addProjectMember =
  async (req, res) => {
    try {
      const {
        projectId,
      } = req.params;

      const email =
        req.body?.email
          ?.trim()
          .toLowerCase();

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Member email is required",
        });
      }

      const project =
        await Project.findById(
          projectId
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      if (
        !project.isOwner(
          req.user._id
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Only the project owner can add members",
        });
      }

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "No DevSync account found with this email. Ask the user to register first.",
        });
      }

      if (
        project.owner.toString() ===
        user._id.toString()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Project owner is already a member",
        });
      }

      if (
        project.members.some(
          (member) =>
            member.toString() ===
            user._id.toString()
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "User is already a project member",
        });
      }

      project.members.push(
        user._id
      );

      await project.save();

      const updatedProject =
        await Project.findById(
          project._id
        )
          .populate(
            "owner",
            "name email avatar role"
          )
          .populate(
            "members",
            "name email avatar role"
          );

      return res.json({
        success: true,
        message:
          `${user.name} added to the project`,
        project:
          updatedProject,
      });
    } catch (error) {
      console.error(
        "ADD PROJECT MEMBER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to add project member",
      });
    }
  };

/* =========================================================
   REMOVE MEMBER
========================================================= */

export const removeProjectMember =
  async (req, res) => {
    try {
      const {
        projectId,
        userId,
      } = req.params;

      const project =
        await Project.findById(
          projectId
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      if (
        !project.isOwner(
          req.user._id
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Only the project owner can remove members",
        });
      }

      if (
        project.owner.toString() ===
        userId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Project owner cannot be removed",
        });
      }

      const isMember =
        project.members.some(
          (member) =>
            member.toString() ===
            userId
        );

      if (!isMember) {
        return res.status(404).json({
          success: false,
          message:
            "User is not a project member",
        });
      }

      project.members =
        project.members.filter(
          (member) =>
            member.toString() !==
            userId
        );

      await project.save();

      return res.json({
        success: true,
        message:
          "Team member removed successfully",
        project,
      });
    } catch (error) {
      console.error(
        "REMOVE PROJECT MEMBER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to remove project member",
      });
    }
  };
