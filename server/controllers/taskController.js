import Task from "../models/Task.js";
import Project from "../models/Project.js";

// =====================================================
// HELPER — CHECK PROJECT MEMBERSHIP
// =====================================================

const isProjectMember = (project, userId) => {
  return (
    project.owner.toString() === userId.toString() ||
    project.members.some(
      (member) => member.toString() === userId.toString()
    )
  );
};


// =====================================================
// HELPER — RECALCULATE PROJECT STATS
// =====================================================

const recalculateProjectStats = async (projectId) => {
  const totalTasks = await Task.countDocuments({
    project: projectId,
  });

  const completedTasks = await Task.countDocuments({
    project: projectId,
    status: "done",
  });

  const progress =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  await Project.findByIdAndUpdate(projectId, {
    totalTasks,
    completedTasks,
    progress,
  });

  return {
    totalTasks,
    completedTasks,
    progress,
  };
};


// =====================================================
// CREATE TASK
// =====================================================

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      priority,
      status,
      assignee,
      tags,
      dueDate,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project is required",
      });
    }

    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (!isProjectMember(existingProject, req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project",
      });
    }

    let validAssignee = null;

    if (assignee) {
      const isAssigneeMember = isProjectMember(
        existingProject,
        assignee
      );

      if (!isAssigneeMember) {
        return res.status(400).json({
          success: false,
          message:
            "Task can only be assigned to a project member",
        });
      }

      validAssignee = assignee;
    }

    const allowedStatuses = [
      "todo",
      "progress",
      "review",
      "done",
    ];

    const taskStatus = status || "todo";

    if (!allowedStatuses.includes(taskStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      project,
      priority: priority || "Medium",
      status: taskStatus,
      assignee: validAssignee,
      tags: Array.isArray(tags) ? tags : [],
      dueDate: dueDate || null,
      createdBy: req.user._id,
    });

    await recalculateProjectStats(project);

    const populatedTask = await Task.findById(task._id)
      .populate("assignee", "name email avatar role")
      .populate("createdBy", "name email avatar");

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: populatedTask,
    });

  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to create task",
    });
  }
};


// =====================================================
// GET PROJECT TASKS
// =====================================================

export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (!isProjectMember(project, req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project",
      });
    }

    const tasks = await Task.find({
      project: projectId,
    })
      .sort({ createdAt: -1 })
      .populate("assignee", "name email avatar role")
      .populate("createdBy", "name email avatar");

    return res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {
    console.error("GET PROJECT TASKS ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to load tasks",
    });
  }
};


// =====================================================
// UPDATE TASK STATUS
// =====================================================

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "todo",
      "progress",
      "review",
      "done",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (!isProjectMember(project, req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project",
      });
    }

    task.status = status;

    await task.save();

    const stats = await recalculateProjectStats(
      project._id
    );

    const updatedTask = await Task.findById(task._id)
      .populate("assignee", "name email avatar role")
      .populate("createdBy", "name email avatar");

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task: updatedTask,
      projectProgress: stats.progress,
    });

  } catch (error) {
    console.error(
      "UPDATE TASK STATUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update task status",
    });
  }
};


// =====================================================
// UPDATE TASK
// =====================================================

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const {
      title,
      description,
      priority,
      status,
      assignee,
      tags,
      dueDate,
    } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (!isProjectMember(project, req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project",
      });
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Task title is required",
        });
      }

      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (priority !== undefined) {
      if (!["Low", "Medium", "High"].includes(priority)) {
        return res.status(400).json({
          success: false,
          message: "Invalid priority",
        });
      }

      task.priority = priority;
    }

    if (status !== undefined) {
      if (
        !["todo", "progress", "review", "done"].includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid task status",
        });
      }

      task.status = status;
    }

    if (assignee !== undefined) {
      if (!assignee) {
        task.assignee = null;
      } else {
        if (!isProjectMember(project, assignee)) {
          return res.status(400).json({
            success: false,
            message:
              "Task can only be assigned to a project member",
          });
        }

        task.assignee = assignee;
      }
    }

    if (tags !== undefined) {
      task.tags = Array.isArray(tags) ? tags : [];
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate || null;
    }

    await task.save();

    const stats = await recalculateProjectStats(
      project._id
    );

    const updatedTask = await Task.findById(task._id)
      .populate("assignee", "name email avatar role")
      .populate("createdBy", "name email avatar");

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
      projectProgress: stats.progress,
    });

  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to update task",
    });
  }
};


// =====================================================
// DELETE TASK
// =====================================================

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (!isProjectMember(project, req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project",
      });
    }

    await Task.findByIdAndDelete(taskId);

    const stats = await recalculateProjectStats(
      project._id
    );

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      projectProgress: stats.progress,
      totalTasks: stats.totalTasks,
      completedTasks: stats.completedTasks,
    });

  } catch (error) {
    console.error("DELETE TASK ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to delete task",
    });
  }
};
