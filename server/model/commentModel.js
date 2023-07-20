const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
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
      required: false,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
