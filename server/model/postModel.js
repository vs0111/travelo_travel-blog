const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    views: {
      type: Array,
      required: false,
    },
    likes: {
      type: Array,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
