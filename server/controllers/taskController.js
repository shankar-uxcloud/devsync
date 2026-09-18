import mongoose from "mongoose";

import Task from "../models/Task.js";
import Project from "../models/Project.js";

/* =========================================================
   HELPERS
========================================================= */

const ALLOWED_STATUSES = [
  "todo",
  "progress",
  "review",
  "done",
];

const ALLOWED_PRIORITIES = [
  "Low",
  "Medium",
  "High",
];

const isProjectMember = (
  project,
  userId
) => {
  const id =
    userId.toString();

  return (
    project.owner.toString() ===
      id ||
    project.members.some(
      (member) =>
        member.toString() === id
    )
  );
};

const recalculateProjectStats =
  async (projectId) => {
    const totalTasks =
      await Task.countDocuments({
        project: projectId,
      });

    const completedTasks =
      await Task.countDocuments({
        project: projectId,
        status: "done",
      });

    const progress =
      totalTasks > 0
        ? Math.round(
            (completedTasks /
              totalTasks) *
              100
          )
        : 0;

    await Project.findByIdAndUpdate(
      projectId,
      {
        totalTasks,
        completedTasks,
        progress,
      }
    );

    return {
      totalTasks,
      completedTasks,
      progress,
    };
  };

const populateTask = (
  query
) =>
  query
    .populate(
      "assignee",
      "name email avatar role"
    )
    .populate(
      "createdBy",
      "name email avatar role"
    );

/* =========================================================
   CREATE TASK
========================================================= */

export const createTask = async (
  req,
  res
) => {
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

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Task title is required",
      });
    }

    if (
      !project ||
      !mongoose.Types.ObjectId.isValid(
        project
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid project is required",
      });
    }

    const existingProject =
      await Project.findById(
        project
      );

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    if (
      !isProjectMember(
        existingProject,
        req.user._id
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not a member of this project",
      });
    }

    const taskStatus =
      status || "todo";

    if (
      !ALLOWED_STATUSES.includes(
        taskStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid task status",
      });
    }

    const taskPriority =
      priority || "Medium";

    if (
      !ALLOWED_PRIORITIES.includes(
        taskPriority
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid task priority",
      });
    }

    let validAssignee = null;

    if (assignee) {
      if (
        !mongoose.Types.ObjectId.isValid(
          assignee
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid assignee",
        });
      }

      if (
        !isProjectMember(
          existingProject,
          assignee
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Task can only be assigned to a project member",
        });
      }

      validAssignee =
        assignee;
    }

    const task =
      await Task.create({
        title:
          title.trim(),
        description:
          description?.trim() ||
          "",
        project,
        status:
          taskStatus,
        priority:
          taskPriority,
        assignee:
          validAssignee,
        tags:
          Array.isArray(tags)
            ? tags
            : [],
        dueDate:
          dueDate || null,
        createdBy:
          req.user._id,
      });

    await recalculateProjectStats(
      project
    );

    const populatedTask =
      await populateTask(
        Task.findById(
          task._id
        )
      );

    return res.status(201).json({
      success: true,
      message:
        "Task created successfully",
      task:
        populatedTask,
    });
  } catch (error) {
    console.error(
      "CREATE TASK ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create task",
    });
  }
};

/* =========================================================
   GET PROJECT TASKS
========================================================= */

export const getProjectTasks =
  async (req, res) => {
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
        !isProjectMember(
          project,
          req.user._id
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not a member of this project",
        });
      }

      const tasks =
        await populateTask(
          Task.find({
            project: projectId,
          }).sort({
            createdAt: -1,
          })
        );

      return res.json({
        success: true,
        tasks,
      });
    } catch (error) {
      console.error(
        "GET PROJECT TASKS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to load tasks",
      });
    }
  };

/* =========================================================
   UPDATE TASK STATUS
========================================================= */

export const updateTaskStatus =
  async (req, res) => {
    try {
      const {
        taskId,
      } = req.params;

      const {
        status,
      } = req.body;

      if (
        !ALLOWED_STATUSES.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid task status",
        });
      }

      const task =
        await Task.findById(
          taskId
        );

      if (!task) {
        return res.status(404).json({
          success: false,
          message:
            "Task not found",
        });
      }

      const project =
        await Project.findById(
          task.project
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      if (
        !isProjectMember(
          project,
          req.user._id
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not a project member",
        });
      }

      task.status =
        status;

      await task.save();

      const stats =
        await recalculateProjectStats(
          project._id
        );

      const populatedTask =
        await populateTask(
          Task.findById(
            task._id
          )
        );

      return res.json({
        success: true,
        message:
          "Task status updated",
        task:
          populatedTask,
        stats,
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

/* =========================================================
   UPDATE TASK
========================================================= */

export const updateTask =
  async (req, res) => {
    try {
      const {
        taskId,
      } = req.params;

      const task =
        await Task.findById(
          taskId
        );

      if (!task) {
        return res.status(404).json({
          success: false,
          message:
            "Task not found",
        });
      }

      const project =
        await Project.findById(
          task.project
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      if (
        !isProjectMember(
          project,
          req.user._id
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not a project member",
        });
      }

      const {
        title,
        description,
        status,
        priority,
        assignee,
        tags,
        dueDate,
      } = req.body;

      if (
        title !== undefined
      ) {
        if (!title?.trim()) {
          return res.status(400).json({
            success: false,
            message:
              "Task title cannot be empty",
          });
        }

        task.title =
          title.trim();
      }

      if (
        description !==
        undefined
      ) {
        task.description =
          String(
            description || ""
          ).trim();
      }

      if (
        status !== undefined
      ) {
        if (
          !ALLOWED_STATUSES.includes(
            status
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid task status",
          });
        }

        task.status =
          status;
      }

      if (
        priority !== undefined
      ) {
        if (
          !ALLOWED_PRIORITIES.includes(
            priority
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid task priority",
          });
        }

        task.priority =
          priority;
      }

      if (
        assignee !==
        undefined
      ) {
        if (
          assignee ===
          null
        ) {
          task.assignee =
            null;
        } else {
          if (
            !mongoose.Types.ObjectId.isValid(
              assignee
            )
          ) {
            return res.status(400).json({
              success: false,
              message:
                "Invalid assignee",
            });
          }

          if (
            !isProjectMember(
              project,
              assignee
            )
          ) {
            return res.status(400).json({
              success: false,
              message:
                "Assignee must be a project member",
            });
          }

          task.assignee =
            assignee;
        }
      }

      if (
        tags !== undefined
      ) {
        task.tags =
          Array.isArray(tags)
            ? tags
            : [];
      }

      if (
        dueDate !==
        undefined
      ) {
        task.dueDate =
          dueDate || null;
      }

      await task.save();

      const stats =
        await recalculateProjectStats(
          project._id
        );

      const populatedTask =
        await populateTask(
          Task.findById(
            task._id
          )
        );

      return res.json({
        success: true,
        message:
          "Task updated successfully",
        task:
          populatedTask,
        stats,
      });
    } catch (error) {
      console.error(
        "UPDATE TASK ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to update task",
      });
    }
  };

/* =========================================================
   DELETE TASK
========================================================= */

export const deleteTask =
  async (req, res) => {
    try {
      const {
        taskId,
      } = req.params;

      const task =
        await Task.findById(
          taskId
        );

      if (!task) {
        return res.status(404).json({
          success: false,
          message:
            "Task not found",
        });
      }

      const project =
        await Project.findById(
          task.project
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      if (
        !isProjectMember(
          project,
          req.user._id
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not a project member",
        });
      }

      await Task.deleteOne({
        _id: taskId,
      });

      const stats =
        await recalculateProjectStats(
          project._id
        );

      return res.json({
        success: true,
        message:
          "Task deleted successfully",
        stats,
      });
    } catch (error) {
      console.error(
        "DELETE TASK ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to delete task",
      });
    }
  };
