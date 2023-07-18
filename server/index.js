const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const conversationRouter=require('./routes/conversations')
const messageRouter=require('./routes/messages')
const connection = require("./db");
const socket = require("socket.io");
const app=express()
app.get('/',(req,res)=>{
  res.send("working fineeeeeeeeee")
})
dotenv.config()
connection()
// middleware

app.use(express.json())
app.use(cors())
app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/chat',conversationRouter)
app.use('/message',messageRouter)


const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
console.log(`Listening on port ${port}...`);
});

const io = socket(server,{
    cors:{
      origin:["https://traveloblog.netlify.app",],

    }
})
// const io = require("socket.io")(8900, {
//     cors: {
//       origin: "http://localhost:3000",
//     },
//   });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      console.log(receiverId + "fun call");
      const user = getUser(receiverId);
    
      if (user && user.socketId) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      } else {
        console.log("User not found or socketId is undefined");
      }
    });
    
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });