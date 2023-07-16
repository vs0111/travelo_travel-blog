import React, { useState } from "react";
import { Box, Divider, IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import axios from "axios";
import img from '../../src/assets/images/ava-3.jpg'


const CommentSection = () => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    try {
      await axios.post("/addComment", { comment: newComment });
      // Add logic to update comments state or fetch comments again
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/deleteComment/${commentId}`);
      // Add logic to update comments state or fetch comments again
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mt="0.5rem">
      <div
        className="d-flex justify-content-between align-self-center"
        style={{
          maxHeight: "60px",
        }}
      >
        <input
          type="text"
          className=""
          placeholder="Add Comment"
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          style={{
            width: "80%",
            borderRadius: "18px",
            paddingLeft: "5px",
          }}
        />
        <button className="btn btn-info" onClick={handleAddComment}>
          Send
        </button>
      </div>
      {/* {comments.map((comment) => ( */}
        <div className="d-flex justify-content-between my-3" >
          <div className="d-flex">
            <img
              src={img}
              alt=""
             
              style={{ borderRadius: "50%",height:"35px",width:"35px" }}
            />  
            <div className="mx-2">
              <span className="d-block">name</span>
              <span className="d-block">comment</span>
            </div>
          
          <IconButton onClick={() => handleDeleteComment()}>
            <DeleteOutlined />
          </IconButton>
          </div>
        </div>
      {/* ))} */}
      <Divider />
    </Box>
  );
};

export default CommentSection;
