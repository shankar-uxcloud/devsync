import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    // ============================================
    // TASK BASIC DETAILS
    // ============================================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // PROJECT
    // ============================================

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // ============================================
    // TASK STATUS
    // ============================================

    status: {
      type: String,
      enum: ["todo", "progress", "review", "done"],
      default: "todo",
    },

    // ============================================
    // PRIORITY
    // ============================================

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // ============================================
    // ASSIGNED DEVELOPER
    // ============================================

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ============================================
    // TECHNOLOGY / TAGS
    // ============================================

    tags: {
      type: [String],
      default: [],
    },

    // ============================================
    // DUE DATE
    // ============================================

    dueDate: {
      type: Date,
      default: null,
    },

    // ============================================
    // CREATED BY
    // ============================================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);