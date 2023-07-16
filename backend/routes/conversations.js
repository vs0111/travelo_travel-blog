const express=require('express')
const router=express()
const conversationController=require('../controllers/conversationController')

router.post('/createConversation',conversationController.createConversation)
router.get('/getConversation/:id',conversationController.getUserConversation)
router.get('/checkConversation/:senderId/:receiverId',conversationController.checkConversation)
router.get('/getConversationCheck/:id',conversationController.conversationCheck)






module.exports=router;
