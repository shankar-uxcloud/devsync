import Project from "../models/Project.js";
import User from "../models/User.js";

// =====================================================
// CREATE PROJECT
// =====================================================

export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      technologies,
      dueDate,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const project = await Project.create({
      name: name.trim(),
      description: description?.trim() || "",
      type: type || "College Project",

      technologies: Array.isArray(technologies)
        ? technologies
        : [],

      dueDate: dueDate || null,

      owner: req.user._id,

      // Owner automatically becomes first member
      members: [req.user._id],
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to create project",
    });
  }
};


// =====================================================
// GET USER PROJECTS
// =====================================================

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user._id },
        { members: req.user._id },
      ],
    })
      .sort({ createdAt: -1 })
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar");

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to load projects",
    });
  }
};


// =====================================================
// GET SINGLE PROJECT
// =====================================================

export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,

      $or: [
        { owner: req.user._id },
        { members: req.user._id },
      ],
    })
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("GET PROJECT BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to load project",
    });
  }
};


// =====================================================
// ADD TEAM MEMBER
// =====================================================

export const addProjectMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    let { email } = req.body;

    email = email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Member email is required",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Only project owner can add members
    if (
      project.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Only the project owner can add members",
      });
    }

    // Find DevSync user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "No DevSync account found with this email. Ask the user to register first.",
      });
    }

    // Don't add owner again
    if (
      project.owner.toString() ===
      user._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Project owner is already a member",
      });
    }

    // Check duplicate
    const alreadyMember = project.members.some(
      (member) =>
        member.toString() === user._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({
        success: false,
        message: "User is already a project member",
      });
    }

    project.members.push(user._id);

    await project.save();

    const updatedProject = await Project.findById(
      project._id
    )
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar");

    return res.status(200).json({
      success: true,
      message: `${user.name} added to the project`,
      project: updatedProject,
    });
  } catch (error) {
    console.error("ADD PROJECT MEMBER ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to add project member",
    });
  }
};


// =====================================================
// REMOVE TEAM MEMBER
// =====================================================

export const removeProjectMember = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Only owner can remove members
    if (
      project.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only the project owner can remove members",
      });
    }

    // Owner cannot remove themselves
    if (
      project.owner.toString() === userId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Project owner cannot be removed",
      });
    }

    const isMember = project.members.some(
      (member) =>
        member.toString() === userId
    );

    if (!isMember) {
      return res.status(404).json({
        success: false,
        message: "User is not a project member",
      });
    }

    project.members = project.members.filter(
      (member) =>
        member.toString() !== userId
    );

    await project.save();

    // Unassign this user from project tasks
    // This will be handled when we improve task logic.

    const updatedProject = await Project.findById(
      project._id
    )
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar");

    return res.status(200).json({
      success: true,
      message: "Team member removed successfully",
      project: updatedProject,
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