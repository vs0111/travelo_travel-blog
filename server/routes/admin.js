const express = require("express")
const  router = express.Router();
const adminController=require('../controllers/adminController')
const blogController=require('../controllers/blogController')


router.post('/login',adminController.login)
router.post('/addCategory',blogController.addCategory)
router.get('/getCategory',blogController.getCategory)
router.get('/getEditCategory/:id',blogController.getEditCategory)
router.patch('/editCategory',blogController.editCategory)
router.delete('/deleteCategory/:id',blogController.deleteCategory)
router.get('/getAllReports',adminController.getAllReports)
router.patch('/disableBlog/:id',adminController.disableBlog)
router.patch('/EnableBlog/:id',adminController.EnableBlog)
router.get('/getHomeChartCount',adminController.getHomeChartCount)


module.exports=router;