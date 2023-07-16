const Blog = require("../model/postModel");
const { User } = require("../model/userModel");
const Media=require('../model/mediaModel')
const Category=require('../model/categoryModel')
const Report=require('../model/ReportModel')
const Comment=require('../model/commentModel')
const Replay=require('../model/replayModel')

const blogController = {
  addBlog: async (req, res) => {
    const blogData = req.body;
    try {
      const newBlog = new Blog({
        title: blogData.title,
        category: blogData.category,
        location: blogData.location,
        content: blogData.content,
        photo: blogData.photo,
        userName: blogData.userName,
        userId: blogData.userId,
      });
  
      const savedBlog = await newBlog.save();
  
      // Push the blogId to the user's blog array field
      await User.findByIdAndUpdate(blogData.userId, { $push: { blogs: savedBlog._id } });
  
      // Update the user collection and set the author field to true for the corresponding userId
      await User.findByIdAndUpdate(blogData.userId, { author: true });
  
      res.json({ savedBlog, message: "Blog Uploaded Successfully" });
    } catch (error) {
      console.error("Error saving blog:", error);
      res.status(500).json({ error: "Failed to save the blog" });
    }
  },
  
  

  getHomeBlog: async (req, res) => {
    try {
      // Retrieve the four latest blogs from the database
      const blogs = await Blog.find().sort({ createdAt: -1 }).limit(6);

      // Return the blog details
      res.json(blogs);
    } catch (error) {
      console.error("Error retrieving blog details:", error);
      res.status(500).json({ error: "Server error" });
    }
  },

  getSingleBlog: async (req, res) => {
    try {
      const blogId = req.params.id;

      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Return the blog details
      res.json(blog);
    } catch (error) {
      console.error("Error retrieving blog details:", error);
      res.status(500).json({ error: "Server error" });
    }
  },

  setView: async (req, res) => {
    const blogId = req.body.blogID;
    const userId = req.body.userId;

    try {
      // Find the blog by its ID
      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Check if the userId already exists in the views array
      if (blog.views.includes(userId)) {
        return res
          .status(200)
          .json({ message: "User ID already exists in the view array" });
      }

      // Push the user ID into the view array field
      blog.views.push(userId);

      // Save the updated blog
      await blog.save();

      // Return the total length of the view array
      const totalViews = blog.views.length;
      return res
        .status(200)
        .json({ message: "User ID added to view array successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getViewCount: async (req, res) => {
    try {
      const blogId = req.params.id;

      // Find the blog by its ID
      const blog = await Blog.findById(blogId);

      if (blog) {
        // Check if the blog object is not null

        // Retrieve the length of the views array or default to 0 if it's empty
        const viewsCount = blog.views.length || 0;

        res.json({ viewsCount });
      } else {
        // Handle the case when the blog object is null or not found
        console.error("Blog not found");
        res.status(404).json({ error: "Blog not found" });
      }
    } catch (error) {
      console.error("Error retrieving blog views count:", error);
      res.status(500).json({ error: "Failed to retrieve blog views count" });
    }
  },

  getBlogDetails: async (req, res) => {
    const userId = req.params.id;
    try {
      const blogs = await Blog.find({ userId }).sort({ createdAt: -1 });
      res.json(blogs);
    } catch (error) {
      console.error("Error finding blogs:", error);
      res.status(500).json({ error: "Failed to find blogs" });
    }
  },

  
  setLike: async (req, res) => {
    const userId = req.body.userId;
    const blogId = req.body.blogID;
    try {
      // Find the blog document by its ID
      const blog = await Blog.findById(blogId);

      if (!blog) {
        throw new Error("Blog not found");
      }

      // Check if the user ID is already in the likes array
      const likedIndex = blog.likes.indexOf(userId);

      if (likedIndex === -1) {
        // User has not liked the blog, add the user ID to the likes array
        blog.likes.push(userId);
        await blog.save();

        // Update the user's like array field
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        user.likes.push(blogId);
        await user.save();

        // Return the updated length of the likes array and a success message
        const likesCount = blog.likes.length;
        res.status(200).json({ message: "User liked the blog", likesCount });
      } else {
        // User has already liked the blog, remove the user ID from the likes array
        blog.likes.splice(likedIndex, 1);
        await blog.save();

        // Update the user's like array field
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        const blogIndex = user.likes.indexOf(blogId);
        if (blogIndex !== -1) {
          user.likes.splice(blogIndex, 1);
          await user.save();
        }

        // Return the updated length of the likes array and a success message
        const likesCount = blog.likes.length;
        res.status(200).json({ message: "User unliked the blog", likesCount });
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error toggling like:", error);
      res.status(500).json({ error: "Failed to toggle like" });
    }
  },

  getLikeCount: async (req, res) => {
    try {
      const blogId = req.params.id;

      // Find the blog by its ID
      const blog = await Blog.findById(blogId);

      if (blog) {
        // Check if the blog object is not null

        // Retrieve the length of the views array or default to 0 if it's empty
        const likeCount = blog.likes.length || 0;

        res.json({ likeCount });
      } else {
        // Handle the case when the blog object is null or not found
        console.error("Blog not found");
        res.status(404).json({ error: "Blog not found" });
      }
    } catch (error) {
      console.error("Error retrieving blog like count:", error);
      res.status(500).json({ error: "Failed to retrieve blog like count" });
    }
  },

  getOneBlog: async (req, res) => {
    const blogId = req.params.id; // Assuming the blog ID is passed as a route parameter
    console.log(blogId);

    try {
      const blog = await Blog.findById(blogId); // Search for the blog by ID in the database

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.status(200).json(blog); // Return the found blog
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  editBlog: async (req, res) => {
    const blogId = req.params.id;
    const blogData = req.body;

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          title: blogData.title,
          category: blogData.category,
          location: blogData.location,
          content: blogData.content,
        },
        { new: true }
      );

      res.json({ updatedBlog, message: "Blog Updated Successfully" });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ error: "Failed to update the blog" });
    }
  },

  getAuthor: async (req, res) => {
    // console.log(req.params.id);
    const authorId = req.params.id;
    try {
      const author = await User.findById(authorId);
      res.status(200).json(author);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteBlog: async (req, res) => {
    const blogId = req.params.id;
    try {
      // Delete the blog from the database using the blogId
      await Blog.findByIdAndDelete(blogId);

      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting blog", error: error.message });
    }
  },

  addMedia:async(req,res)=>{
    try {
      // Extract the image details from req.body
      const { location,photo, userName,userId } = req.body;
  
      // Create a new instance of the Image model with the extracted details
      const newImage = new Media({
        location,
        photo,
        userName,
        userId
      });
  
      // Save the new image to the database
      await newImage.save();
  
      // Respond with a success message
      res.status(200).json({ message: 'Image details added successfully' });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(500).json({ message: 'Failed to add image details' });
    }
    
  },

  getMedia: async (req, res) => {
    try {
      const photos = await Media.aggregate([
        {
          $addFields: {
            userIdObj: { $toObjectId: '$userId' }
          }
        },
        
        {
          $lookup: {
            from: "users",
            localField: "userIdObj",
            foreignField: "_id",
            as: "user"
          }
        },
        // {
        //   $unwind: "$user"
        // },
        {
          $project: {
            _id: 1,
            userId:1,
            location: 1,
            likes: 1,
            photo:1,
            userName:1,
            createdAt: 1,
            userPic:"$user.photo" 
          }
        }
      ]);
      console.log(photos);
      return res.json(photos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  
  

  addLike:async (req,res)=>{
    const postId=req.body.postId
    const userId=req.body.userId
    try {
      const media = await Media.findById(postId);
  
      if (!media) {
        return res.status(404).json({ error: "Media collection not found" });
      }
  
      const index = media.likes.indexOf(userId);
  
      if (index === -1) {
        media.likes.push(userId);
      } else {
        media.likes.splice(index, 1);
      }
  
      const savedMedia = await media.save();
      const likesCount = savedMedia.likes.length;
      const message = index === -1 ? "User liked the media collection" : "User unliked the media collection";
  
      res.status(200).json({postId , likesCount });
    } catch (error) {
      console.error("Error toggling like:", error);
      res.status(500).json({ error: "Failed to toggle like" });
    }
  },
  getAllBlog: async (req, res) => {
    try {
      // Retrieve the four latest blogs from the database
      const blogs = await Blog.find().sort({ createdAt: -1 })

      // Return the blog details
      res.json(blogs);
    } catch (error) {
      console.error("Error retrieving blog details:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
  getOtherBlog: async (req, res) => {
    const authorId = req.params.id;
    try {
      const blogs = await Blog.aggregate([
        { $match: { userId: authorId } }, // Match documents where userId matches the authorId
        { $sample: { size: 10 } }, // Randomly select one document
      ]);
  
      // Fetch author details from the user collection
      const author = await User.findById(authorId);
  
      const result = {
        author: author,
        blogs: blogs
      };
  
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getLikeColor:async(req,res)=>{
    const userId=req.params.userId
    const blogId=req.params.blogId
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.json({ exist: false }); // User not found, respond with exist: false
      }
  
      const likedBlogs = user.likes;
      const blogExists = likedBlogs.includes(blogId);
  
      res.json({ exist: blogExists }); // Respond with exist: true or exist: false based on blog existence in the likes array
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  updateProfile:async(req,res)=>{
    const userId=req.body.userId
    const photo=req.body.imageUrl
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { photo: photo },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  addCategory:async(req,res)=>{
   const categoryName=req.body.category.toUpperCase()
    try {
      const category = new Category({
        category: categoryName
      });
  
      const savedCategory = await category.save();
      res.status(200).json({message:"Category added", savedCategory});
      return savedCategory;
    } catch (error) {
      res.status(500).json({message:'Error adding category', error});
      throw error;
    }
  },
  getCategory:async(req,res)=>{
    try {
      const category=await Category.find().sort({_id:-1})
      if(category){
        res.status(200).json(category)
      }else{
        res.status(404).json({message:"No categories available"})
      }
      
    } catch (error) {
      res.status(500).json({message:'Error adding category', error});
      throw error;
      
    }
  },

  getEditCategory:async(req,res)=>{
    const catId=req.params.id
    try {
      const category = await Category.findById(catId);
      
      if (!category) {
        throw new Error('Category not found');
      }
  
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({message:'Error adding category', error});
      throw error;
    }
  },

  editCategory: async (req,res)=>{
   const catId=req.body.catId
    const editCategory=req.body.editCategory
    try {
      const category = await Category.findByIdAndUpdate(catId,{category:editCategory}, { new: true });
  
      if (!category) {
        throw new Error('Category not found');
      }
  
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({message:'Error adding category', error});
      throw error;
    }
  },

  deleteCategory: async(req,res)=>{
    const catId=req.params.id
    try {
      const deletedCat = await Category.findByIdAndRemove(catId);
  
      if (!deletedCat) {
        throw new Error('Category not found');
      }
      const category=await Category.find()
  
      res.status(200).json(category);
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },

  reportblog: async (req, res) => {
    console.log(req.body);
  
    const { blogID, userId, reasons } = req.body;
    try {
      const existingReport = await Report.findOne({
        blog: blogID,
        reportedBy: userId,
      });
      if (existingReport) {
        console.log("dddddddddd");
         res
          .status(200) 
          .json({msg: "Already reported this post" });
      }else{
        const newReport = new Report({
          blog: blogID,
          reportedBy: userId,
          reasons,
        });
    
        const savedPost = await newReport.save();
        res.status(200).json({ msg: "Reported the post" });

      }
  
    
    } catch (error) {
      console.log("errr", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  addComment: async (req, res) => {
    // console.log(req.body)
    try {
      // Extract the image details from req.body
      const { blogID, userId, userName, newComment } = req.body;
      console.log(blogID, userId, userName, newComment);
  
      // Create a new instance of the Image model with the extracted details
      const newComments = new Comment({
        blogId: blogID,
        userId,
        userName,
        comment: newComment,
      });
  
      // Save the new image to the database
      await newComments.save();
  
    //  console.log(blogID);
      const Comments = await Comment.aggregate([
       
        {
          $match: { blogId: blogID },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $addFields: {
            userIdObj: { $toObjectId: '$userId' }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userIdObj',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: '$userDetails',
        },
        {
          $project: {
            _id: 1,
            blogId: 1,
            userId: 1,
            userName: 1,
            comment: 1,
            userPhoto: '$userDetails.photo', // Create new userPhoto field
          },
        },
      ]);
  
      // Respond with a success message
      res.status(200).json({ message: 'Comment added', Comments });
      // console.log(Comments);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(500).json({ message: 'Failed to add image details' });
    }
  },
  
    
  
  deleteComment: async (req, res) => {
    const commentId = req.params.id;
    const blogId = req.params.blogId;
    console.log(commentId);
    console.log(blogId);
    
    try {
      // Find the comment by ID
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Delete the comment
      await comment.deleteOne();
  
      // Retrieve the remaining comments for the blog
      const comments = await Comment.aggregate([
       
        {
          $match: {blogId},
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $addFields: {
            userIdObj: { $toObjectId: '$userId' }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userIdObj',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: '$userDetails',
        },
        {
          $project: {
            _id: 1,
            blogId: 1,
            userId: 1,
            userName: 1,
            comment: 1,
            userPhoto: '$userDetails.photo', // Create new userPhoto field
          },
        },
      ]);
  
      // Return success response with the remaining comments
      return res.status(200).json({ message: 'Comment deleted successfully', comments });
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  getAllComment:async(req,res)=>{
    const blogId=req.params.id
    try {
      const commentsWithPhoto = await Comment.aggregate([
        {
          $match:{blogId:blogId}
        },
        {
          $addFields: {
            userIdObj: { $toObjectId: '$userId' }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userIdObj',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $addFields: {
            userPhoto: { $arrayElemAt: ['$user.photo', 0] }
          }
        },
        {
          $project: {
            'user.photo': 0,
            'user.password': 0,
            'user.__v': 0,
            'user._id': 0
          }
        },
        {
          $unwind: '$user'
        },
        {
          $project: {
            userIdObj: 0,
            user: 0
          }
        }
      ]).sort({createdAt:-1})
  
      return res.json(commentsWithPhoto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch comments' });
    }
  },
  getClientCategory:async(req,res)=>{
  try {
    const category=await Category.find().sort({createdAt:-1})

    if(category){
      res.status(200).json(category)
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch comments' });
  }
  },

  addReplay: async (req, res) => {
    // console.log(req.body)
    try {
      // Extract the image details from req.body
      const {commentId,blogID, userId, userName, newReplay} = req.body;  
      // Create a new instance of the Image model with the extracted details
      const newReplays = new Replay({
        commentId,
        blogId: blogID,
        userId,
        userName,
        replay: newReplay,
      });
  
      // Save the new image to the database
      await newReplays.save();
  
    //  console.log(blogID);
      const replay = await Replay.aggregate([
       
        {
          $match: { commentId },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $addFields: {
            userIdObj: { $toObjectId: '$userId' }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userIdObj',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: '$userDetails',
        },
        {
          $project: {
            _id: 1,
            commentId:1,
            blogId: 1,
            userId: 1,
            userName: 1,
            replay: 1,
            userPhoto: '$userDetails.photo', // Create new userPhoto field
          },
        },
      ]);
  
      // Respond with a success message
      res.status(200).json({ message: 'Replay Added', replay });
      // console.log(Comments);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(500).json({ message: 'Failed to add image details' });
    }
  },
  getAllRepaly:async(req,res)=>{
    const commentId=req.params.id
    try {
      const ReplayWithPhoto = await Replay.aggregate([
        {
          $match:{commentId:commentId}
        },
        {
          $addFields: {
            userIdObj: { $toObjectId: '$userId' }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userIdObj',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $addFields: {
            userPhoto: { $arrayElemAt: ['$user.photo', 0] }
          }
        },
        {
          $project: {
            'user.photo': 0,
            'user.password': 0,
            'user.__v': 0,
            'user._id': 0
          }
        },
        {
          $unwind: '$user'
        },
        {
          $project: {
            userIdObj: 0,
            user: 0
          }
        }
      ]).sort({createdAt:-1})
  
      return res.json(ReplayWithPhoto);
      // console.log(ReplayWithPhoto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch comments' });
    }
  }, 

  getCommentCount:async(req,res)=>{
    const blogId=req.params.id
    try {
      const commentCount=await Comment.find({blogId}).count()
      if(commentCount){
      return res.status(200).json(commentCount)
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch comments' });
    
    }
  },
  
  setReplayLike: async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.params.userId;
    
    try {
      const comment = await Comment.findById(commentId);
   
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
    
      const index = comment.likes.indexOf(userId);
      console.log(index);
    
      if (index === -1) {
        comment.likes.push(userId);
      } else {
        comment.likes.splice(index, 1);
      }
    
      const savedComment = await comment.save();
      const likesCount = savedComment.likes.length;
      const message = index === -1 ? "User liked the comment" : "User unliked the comment";
    
      res.status(200).json({commentId, likesCount });
    } catch (error) {
      console.error("Error toggling like:", error);
      res.status(500).json({ error: "Failed to toggle like" });
    }
  },

  supportAuthor:async (req,res)=>{
    const authorId=req.params.authorId
    const userId=req.params.userId
    try {
      // Find the author document based on your data model
      const author = await User.findById(authorId);
  
      // Check if the user already exists in the supports array
      const existingIndex = author.support.indexOf(userId);
  
      if (existingIndex !== -1) {
        // User already exists, remove the user from the supports array
        author.support.splice(existingIndex, 1);
        await author.save();
  
        return res.json({
          isSupport: false,
          count: author.support.length,
        });
      } else {
        // User does not exist, add the user to the supports array
        author.support.push(userId);
        await author.save();
  
        return res.json({
          isSupport: true,
          count: author.support.length,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  checkUserSupport:async(req,res)=>{
    const userId=req.params.userId
    const authorId=req.params.authorId
    try {
      // Find the author document based on authorId
      const author = await User.findById(authorId);
  
      if (!author) {
        // Author not found
        return res.json({ isSupport: false });
      }
  
      // Check if the userId exists in the supports array of the author
      const isSupport = author.support.includes(userId);
      return res.json({ isSupport });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  popularAuthor:async(req,res)=>{
    try {
      // Find users that satisfy the conditions
      const users = await User.find({
        author: true,
        $expr: { $gt: [{ $size: "$blogs" }, 0] }
      });
    
      return res.json(users);
      // console.log(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
    
  },
  deletePost:async(req,res)=>{
    const postId=req.params.id
    try {
      // Delete the post from the media collection
      await Media.findByIdAndDelete(postId);
      
      // Get the remaining posts from the media collection
      const existingPost = await Media.aggregate([
        {
          $addFields: {
            userIdObj: { $toObjectId: '$userId' }
          }
        },
        
        {
          $lookup: {
            from: "users",
            localField: "userIdObj",
            foreignField: "_id",
            as: "user"
          }
        },
        // {
        //   $unwind: "$user"
        // },
        {
          $project: {
            _id: 1,
            userId:1,
            location: 1,
            likes: 1,
            photo:1,
            userName:1,
            createdAt: 1,
            userPic:"$user.photo" 
          }
        }
      ]);
      
      // Return the remaining posts as the response
      return res.json(existingPost);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  
  
}

module.exports = blogController;
