import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },

    type: {
      type: String,
      default: "College Project",
      trim: true,
    },

    technologies: {
      type: [String],
      default: [],
      set: (values) =>
        Array.isArray(values)
          ? values
              .map((value) =>
                String(value).trim()
              )
              .filter(Boolean)
          : [],
    },

    dueDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Active",
        "In Progress",
        "Completed",
        "Archived",
        "Planning",
        "Review",
      ],
      default: "Active",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    totalTasks: {
      type: Number,
      default: 0,
      min: 0,
    },

    completedTasks: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================================================
   INDEXES
========================================================= */

projectSchema.index({
  owner: 1,
  createdAt: -1,
});

projectSchema.index({
  members: 1,
  createdAt: -1,
});

/* =========================================================
   HELPERS
========================================================= */

projectSchema.methods.isMember = function (
  userId
) {
  const id = userId.toString();

  return (
    this.owner.toString() === id ||
    this.members.some(
      (member) =>
        member.toString() === id
    )
  );
};

projectSchema.methods.isOwner = function (
  userId
) {
  return (
    this.owner.toString() ===
    userId.toString()
  );
};

export default mongoose.model(
  "Project",
  projectSchema
);
