const bcrypt = require("bcrypt");
const { Admin, validateLogin } = require("../model/adminModel");
const Report = require("../model/ReportModel");
const Blog = require("../model/postModel");
const { User } = require("../model/userModel");
// const { array } = require('joi')

const adminController = {
  login: async (req, res) => {
    try {
      const { error } = validateLogin(req.body);
      // console.log("validation ok");
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const admin = await Admin.findOne({ email: req.body.email });

      if (!admin)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        admin.password
      );

      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });
      // console.log("admiin");
      const token = admin.generateAuthToken();
      // console.log("admin");

      res.status(200).send({ admin, token, message: "logged in successfully" });
    } catch (error) {
      res.status(500).send({ error });
    }
  },

  getAllReports: async (req, res) => {
    try {
      const reports = await Report.aggregate([
        {
          $addFields: {
            userIdObj: { $toObjectId: "$blog" },
          },
        },
        {
          $addFields: {
            reportedByObj: { $toObjectId: "$reportedBy" },
          },
        },

        {
          $group: {
            _id: "$userIdObj",
            count: { $sum: 1 },
            reasons: { $push: "$reasons" },
            reportedBy: { $push: "$reportedByObj" },
          },
        },

        {
          $lookup: {
            from: "blogs",
            localField: "_id",
            foreignField: "_id",
            as: "blog",
          },
        },

        {
          $unwind: "$blog",
        },

        {
          $lookup: {
            from: "users",
            localField: "reportedBy",
            foreignField: "_id",
            as: "reportedByUsers",
          },
        },
      ]);
      // console.log("repo ", reports);
      res.status(200).json(reports);
    } catch (err) {
      res.status(500);
    }
  },

  disableBlog: async (req, res) => {
    const blogId = req.params.id;
    try {
      // Find the blog by ID and update the isDisabled field
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { isDisabled: true },
        { new: true }
      );

      if (!updatedBlog) {
        // Blog with the provided ID was not found
        res.status(404).json({ message: "Blog not found." });
      }

      res
        .status(200)
        .json({ message: "Blog disabled successfully.", blog: updatedBlog });
    } catch (error) {
      // Error occurred while updating the blog
      res.status(500).send({ error });
    }
  },
  EnableBlog: async (req, res) => {
    const blogId = req.params.id;
    try {
      // Find the blog by ID and update the isDisabled field
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { isDisabled: false },
        { new: true }
      );

      if (!updatedBlog) {
        // Blog with the provided ID was not found
        res.status(404).json({ message: "Blog not found." });
      }

      res
        .status(200)
        .json({ message: "Blog disabled successfully.", blog: updatedBlog });
    } catch (error) {
      // Error occurred while updating the blog
      res.status(500).send({ error });
    }
  },

  getHomeChartCount: async (req, res) => {
    try {
      const userCount = await User.find({}).count();
      const authorCount = await User.find({ author: true }).count();
      const blogCount = await Blog.find({}).count();
      const reportCount = await Report.find({}).count();
      // console.log(userCount,authorCount,blogCount,reportCount);
      res.status(200).json({ userCount, authorCount, blogCount, reportCount });
    } catch (error) {
      res.status(500).send({ error });
    }
  },
};
module.exports = adminController;
