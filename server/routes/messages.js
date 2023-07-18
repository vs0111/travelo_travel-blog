const express=require('express')
const router=express()
const messageController=require('../controllers/messageController')


router.post('/addMessage',messageController.addMessage)
router.get('/getMessage/:id',messageController.getMessage)







module.exports=router;
