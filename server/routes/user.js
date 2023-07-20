const express = require("express")
const  router = express.Router();
const userController = require("../controllers/userController")
const blogController = require("../controllers/blogController")


router.post('/signup',userController.signup);
router.post('/login',userController.login)
router.post('/editProfile/:id',userController.editProfile)
router.post('/addBlog',blogController.addBlog)
router.get('/getHomeBlogs',blogController.getHomeBlog)
router.get('/getSingleBlog/:id',blogController.getSingleBlog)
router.patch('/setViews',blogController.setView)
router.get('/getViewCount/:id',blogController.getViewCount)
router.get('/getUser',userController.getUsers)
router.get('/getAuthor',userController.getAuthor)
router.get('/blogDetails/:id',blogController.getBlogDetails)
router.get('/getLikeCount/:id',blogController.getLikeCount)
router.post('/setLike',blogController.setLike)
router.get('/getOneBlog/:id',blogController.getOneBlog)
router.put('/editBlog/:id',blogController.editBlog)
router.get('/getAuthor/:id',blogController.getAuthor)
router.get('/getUser/:id',userController.getOneUser)
router.delete('/deleteBlog/:blogId/:userId',blogController.deleteBlog)
router.patch('/blockUser/:id',userController.blockUser)
router.patch('/unBlockUser/:id',userController.unBlockUser)
router.post('/addMedia',blogController.addMedia)
router.get('/getMedia',blogController.getMedia)
router.patch('/likePost',blogController.addLike)
router.get('/getAllBlogs',blogController.getAllBlog)
router.get('/getOtherBlogs/:id',blogController.getOtherBlog)
router.get('/getLikeColor/:userId/:blogId',blogController.getLikeColor)
router.patch('/updateProfie',blogController.updateProfile)
router.post('/reportblog',blogController.reportblog)
router.post('/addComment',blogController.addComment)
router.delete('/deleteComment/:id/:blogId',blogController.deleteComment)
router.get('/getAllComment/:id',blogController.getAllComment)
router.get('/getClientCategory',blogController.getClientCategory)
router.post('/addReplay',blogController.addReplay)
router.get('/getAllRepaly/:id',blogController.getAllRepaly)
router.get('/getCommentCount/:id',blogController.getCommentCount)
router.patch('/setReplayLike/:commentId/:userId',blogController.setReplayLike)
router.patch('/supportAuthor/:authorId/:userId',blogController.supportAuthor)
router.get('/checkUserSupport/:userId/:authorId',blogController.checkUserSupport)
router.get('/popularAuthor',blogController.popularAuthor)
router.delete('/deletePost/:id',blogController.deletePost)







module.exports =router;




