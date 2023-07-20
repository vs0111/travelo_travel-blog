const mongoose = require("mongoose");

const ReplaySchema = new mongoose.Schema(
  {
    commentId: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    replay: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Replay = mongoose.model("Replay", ReplaySchema);

module.exports = Replay;
