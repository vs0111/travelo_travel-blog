import React, { useEffect, useRef, useState } from "react";
import "./comment.css";
import { Box, Divider, Button } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import userPic from "../../assets/images/user.png";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";

const Comment = ({ blogID }) => {
  const [newComment, setNewComment] = useState("");
  const [comment, setComment] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [replay, setReplay] = useState(false);
  const [newReplay, setNewReplay] = useState("");
  const [replayData, setReplayData] = useState([]);
  const [commentCount, setCommentCount] = useState({ likesCount: null });
  const user = useSelector((state) => state.user);
  const userName = user.name;
  const userId = user._id;
  const commentIdRef = useRef();

  const handleAddComment = async () => {
    if (newComment) {
      const commentDetails = {
        blogID,
        userId,
        userName,
        newComment,
      };
      try {
        const res = await axios.post("/addComment", commentDetails);
        console.log(res.data);
        if (res.status === 200) {
          setComment(res.data.Comments);
          console.log(res.data.Comments[0]);
          // setCommentUser(res.data.Comments[0].userId);
        }
        setNewComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`/getAllComment/${blogID}`);
      setComment(res.data);
      console.log(res.data);
    };
    getComments();
  }, []);

  const getAllReplay = async () => {
    const res = await axios.get(`/getAllRepaly/${commentId}`);
    setReplayData(res.data);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`/deleteComment/${commentId}/${blogID}`);
      console.log(res.data);
      setComment(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReplay = (commentId) => {
    setReplay(!replay);
    setCommentId(commentId);
    getAllReplay();
  };

  const handleReplaySubmit = async (e) => {
    e.preventDefault();
    const commentId = commentIdRef.current.value;
    console.log(commentId);
    const repalyDetails = {
      commentId,
      blogID,
      userId,
      userName,
      newReplay,
    };
    try {
      const res = await axios.post("/addReplay", repalyDetails);
      setReplayData(res.data.replay);
      setNewReplay("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCommentLike = async (commentId) => {
    const res = await axios.patch(`/setReplayLike/${commentId}/${userId}`);
    console.log(res.data);
    setCommentCount(res.data);
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
            borderRadius: "10px",
            paddingLeft: "5px",
          }}
        />
        <button className="btn btn-info" onClick={handleAddComment}>
          Send
        </button>
      </div>

      {comment?.map((comment) => (
        <>
          <div
            className="d-flex justify-content-between my-3 mb-0 mt-2"
            style={{
              backgroundColor: "whitesmoke",
              borderRadius: "10px",
              width: "85%",
              height: "95px",
            }}
          >
            <div className="d-flex">
              {comment.userPhoto ? (
                <img
                  src={comment.userPhoto}
                  alt=""
                  style={{
                    borderRadius: "50%",
                    height: "35px",
                    width: "35px",
                    marginLeft: "10px",
                    marginTop: "6px",
                  }}
                />
              ) : (
                <img
                  src={userPic}
                  alt=""
                  style={{
                    borderRadius: "50%",
                    height: "35px",
                    width: "35px",
                    marginLeft: "10px",
                    marginTop: "6px",
                  }}
                />
              )}

              <div className="user-comment mx-2">
                <span className="d-block">{comment.userName}</span>
                <span
                  style={{ fontWeight: "400", marginTop: "-10px" }}
                  className="d-block"
                >
                  {comment.comment}
                </span>
                <i
                  class="icons ri-heart-3-line"
                  onClick={() => handleCommentLike(comment._id)}
              >  {comment._id===commentCount.commentId?
                commentCount.likesCount:comment.likes?.length 
               }
                </i>

                <i
                  className=" ri-discuss-line"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleReplay(comment._id)}
                ></i>
                <div>
                  {userId === comment.userId ? (
                    <DeleteOutlined
                      className="delete"
                      onClick={() => handleDeleteComment(comment._id)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          {replay && comment._id === commentId ? (
            <>
              <form onSubmit={handleReplaySubmit}>
                <div
                  className="replay d-flex justify-content-between align-self-center mt-2"
                  style={{
                    maxHeight: "60px",
                  }}
                >
                  <input
                    type="text"
                    className=""
                    placeholder="Add Replay..."
                    onChange={(e) => setNewReplay(e.target.value)}
                    value={newReplay}
                    style={{
                      width: "40%",
                      borderRadius: "10px",
                      marginBottom: "2px",
                    }}
                  />
                  <input
                    type="text"
                    name="commentId"
                    ref={commentIdRef}
                    value={comment._id}
                    hidden
                  />
                  <Button
                    style={{
                      border: "none",
                      backgroundColor: "#2cb82e",
                      color: "white",
                      marginRight: "420px",
                      borderRadius: "10px",
                    }}
                    type="submit"
                    // onClick={() => getAllReplay(comment._id)}
                  >
                    Replay
                  </Button>
                </div>
              </form>
              {replayData.map((replay) =>
                comment._id === replay.commentId ? (
                  <div
                    className="d-flex justify-content-between my-3 mb-0"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                      width: "73%",
                      height: "95px",
                      marginLeft: "100px",
                    }}
                  >
                    {replay.userPhoto ? (
                      <img
                        src={replay.userPhoto}
                        alt=""
                        style={{
                          borderRadius: "50%",
                          height: "35px",
                          width: "35px",
                          marginLeft: "10px",
                          marginTop: "6px",
                        }}
                      />
                    ) : (
                      <img
                        src={userPic}
                        alt=""
                        style={{
                          borderRadius: "50%",
                          height: "35px",
                          width: "35px",
                          marginLeft: "10px",
                          marginTop: "6px",
                        }}
                      />
                    )}

                    <div
                      className="user-replay"
                      style={{ marginRight: "83%", marginTop: "-10px" }}
                    >
                      <span className="d-block">{replay.userName}</span>
                      <span
                        style={{ fontWeight: "400", marginTop: "-10px" }}
                        className="d-block"
                      >
                        {replay.replay}
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </>
          ) : (
            ""
          )}
        </>
      ))}

      <hr />
      <Divider />
    </Box>
  );
};

export default Comment;
