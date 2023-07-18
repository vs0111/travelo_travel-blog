const Conversation=require("../model/Conversation");


const conversationController={

    createConversation:async(req,res)=>{
        // console.log("dddddddddddddddddddddd");
        // console.log(req.body);
        const newConversation = new Conversation({
            members:[req.body.senderId,req.body.receiverId],

        })
        try{
            const savedConversation=await newConversation.save()
            res.status(200).json(savedConversation)

        }catch(error){
         res.status(500).json(error)
        }
    },

    getUserConversation:async(req,res)=>{
        try {
        const conversation=await Conversation.find({
            members:{$in:[req.params.id]},
        }).sort({createdAt:-1})
        res.status(200).json(conversation)

        } catch (error) {
          res.status(500).json(error)
        }

    },
    checkConversation: async (req,res)=>{
        // console.log();     
        // console.log(req.params.receiverId);  
        const userId=req.params.senderId
        const authorId=req.params.receiverId

        try {
            const conversation = await Conversation.findOne({
              members: { $all: [userId, authorId] },
            });
        
            if (conversation) {
              // Conversation exists
              res.json({ exists: true });
            } else {
              // Conversation does not exist
              res.json({ exists: false });
            }
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
          }   
    },
    conversationCheck: async (req, res) => {
      try {
        const conversation = await Conversation.find({
          members: { $in: [req.params.id] },
        });
    
        if (conversation.length === 0) {
          res.status(200).json({ chatExist: false });
        } else {
          res.status(200).json({ chatExist: true });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }

}

module.exports=conversationController;