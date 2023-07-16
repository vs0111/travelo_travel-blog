import React, { useState, useEffect, useRef } from "react";
import "./single-post.css";
import img from "../../assets/images/gallery-01.jpg";
import user from "../../assets/images/user.png";
import { Container } from "reactstrap";
import Menu from "../../components/Menu/Menu";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import heart from "../../assets/images/heart.png";
import likes from "../../assets/images/like.png";

import {
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import CheckBox from "../../components/ChechBox/CheckBox";
import CommentSection from "../../components/CommentSection";
import Comment from "../../components/comment/Comment";

function SinglePost() {
  const [blog, setBlog] = useState({});
  const [viewCount, setViewCont] = useState("");
  const [like, setLike] = useState("");
  const [likeColor, setLikeColor] = useState(false);
  const [authorId, setAuthorId] = useState("");
  const [menuBlog, setMenuBlog] = useState([]);
  const [likeExistt, setLikeExistt] = useState(false);
  const [show, setShow] = useState(false);
  const [author, setAuthor] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentCount,setCommentCount]=useState("")
  const blogId = useParams();
  const blogID = blogId.id;
  const userId = useSelector((state) => state.user._id);

  const timeOutRef = useRef("");
  const timer = useRef(5000);
  const startTimeRef = useRef(new Date());

  useEffect(() => {
    axios.get(`/getSingleBlog/${blogId.id}`).then((response) => {
      setBlog(response.data);
      setAuthorId(response.data.userId);
    });
      axios.get(`/getViewCount/${blogId.id}`).then((response) => {
        setViewCont(response.data.viewsCount);
      });
        axios.get(`/getLikeCount/${blogId.id}`).then((response) => {
          setLike(response.data.likeCount);
        });
       
  

    timeOutRef.current = setTimeout(() => {
      setView();
    }, timer.current || 5000);

    return () => {
      let timeDiff = startTimeRef.current.getMilliseconds;
      if (new Date().getMilliseconds() - timeDiff > timer.current) {
        setViewCont();
      } else {
        timer.current = new Date().getMilliseconds() - timeDiff;
        clearTimeout(timeOutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const getOtherBlog = async () => {
      const res = await axios.get(`/getOtherBlogs/${authorId}`);
      // console.log(res.data);
      setMenuBlog(res.data.blogs);
      setAuthor(res.data.author);
    };
    getOtherBlog();
  }, [blog]);

  useEffect(() => {
    const getCommentCount = async()=>{
      try {
        const res=await axios.get(`/getCommentCount/${blogID}`)
        setCommentCount(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getCommentCount()
  }, []);

  useEffect(() => {
    const getLikeColor = async () => {
      const res = await axios.get(`/getLikeColor/${userId}/${blogID}`);
      setLikeExistt(res.data.exist);
    };
    getLikeColor();
  }, []);

  function setView() {
    // code

    axios.patch(`/setViews`, { blogID, userId }).then((response) => {
      // console.log(response.data);
      if (response.data.viewCount) {
        setViewCont(response.data.totalViews);
      }
    });
  }

  const handleLike = () => {
    setLikeColor(!likeColor);
    axios.post("/setLike", { blogID, userId }).then((response) => {
      // console.log(response.data.likesCount);
      setLike(response.data.likesCount);
    });
  };
  console.log(likeExistt);

  function formatDateTime(dateTime) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateTime).toLocaleString(undefined, options);
  }

  const formattedDateTime = formatDateTime(blog.createdAt);
  const setShowFun = (value)=>{
    setShow(value);
  }

  return (
    <Container>
      <div className="single">
        <div className="content">
          <img src={blog.photo} alt="" />
          <div className="user">
            {author.photo ? (
              <img src={author.photo} alt="" />
            ) : (
              <img src={user} alt="" />
            )}
            <div className="info">
              {userId === blog.userId ? (
                <span>{blog.userName}</span>
              ) : (
                <span className="userName">
                  <Link
                    to={`/author/${blog.userId}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      marginTop: "200px",
                    }}
                  >
                    {" "}
                    {blog.userName}
                  </Link>
                </span>
              )}
              {/* <span className="more"> */}

              {/* </span> */}

              <span className="view">
                <i
                  onClick={() => setShow(true)}
                  className="icon2 ri-flag-line"
                ></i>
              </span>
              <i class="icon3 ri-eye-line"></i>
              {viewCount}

              {likeColor || likeExistt ? (
                <span className="like">
                  <i
                    onClick={handleLike}
                    className="icon1 ri-thumb-up-fill"
                    style={{ color: "blue" }}
                  ></i>

                  {like}
                </span>
              ) : (
                <span className="like">
                  <i
                    onClick={handleLike}
                    className="icon1 ri-thumb-up-line"
                  ></i>
                  {like}
                </span>
              )}

              {/* <ul> <li style={{paddingLeft:"200px"}}>g</li></ul> */}

              <p>{formattedDateTime}</p>
            </div>
          </div>
          <h1>{blog.title}</h1>
          <p>
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
          </p>
          <hr />
          <div style={{marginTop:"-30px"}} >
          <img onClick={handleLike}
                  className="likeIcon"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "5px",
                    cursor: "pointer",
                    

                  }}
                  src={likes}
                  alt=""
                />
                <img
                onClick={handleLike}
                  className="likeIcon"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "5px",
                    cursor: "pointer",
                    
                  }}
                  src={heart}
                  alt=""
                />{like}
             <span style={{marginLeft:"20px",fontSize:"21px",marginTop:"-12px"}}><i class="ri-message-2-fill" onClick={()=>setShowCommentBox(!showCommentBox)}></i></span> {commentCount}
          </div>
          {
            showCommentBox && <Comment blogID={blogID}/>
          }
        </div>
        <Menu menuBlog={menuBlog} />
      </div>
      <Modal show={show}>
        <ModalHeader>
          <ModalTitle>
            <h5>REPORT BLOG</h5>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <CheckBox blogID={blogID} setShowFun={setShowFun}  />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default SinglePost;
