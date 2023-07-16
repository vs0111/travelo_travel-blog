import React, { useEffect, useState } from "react";
import "./author-page.css";
import user from "../../assets/images/user.png";
import { Button, Row, Col } from "reactstrap";
import LatestBlog from "../../components/LatestBlog/LatestBlog";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import AuthorBlogs from "../../components/authorBlogs/AuthorBlogs";

const AuthorPage = () => {
  const [author, setAuthor] = useState({});
  const [exist, setExist] = useState(Boolean);
  const [supportExist,setSupportExist]=useState(Boolean)
  const [supportCount,setSupportCont]=useState()
  const authors = useParams();
  const authorId = authors.id;
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/getAuthor/${authorId}`).then((response) => {
      setAuthor(response.data);
    });
  }, []);

  useEffect(() => {
    const checkConversation = async () => {
      try {
        const res = await axios.get(
          `/chat/checkConversation/${userId}/${authorId}`
        );
        setExist(res.data.exists);
      } catch (error) {
        console.log(error);
      }
    };
    checkConversation();
  }, []);
  // console.log(exist);

  const handleChat = async () => {
    const Id = {
      senderId: userId,
      receiverId: authorId,
    };
    try {
      const res = await axios.post(`/chat/createConversation`, Id);
      if (res.status) {
        navigate("/authorChat");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSupport=async(authorId)=>{
    const res=await axios.patch(`/supportAuthor/${authorId}/${userId}`)
    setSupportCont(res.data.count)
    setSupportExist(res.data.isSupport)
  }
  useEffect(()=>{
    const checkUserSupport = async() =>{
      const res=await axios.get(`/checkUserSupport/${userId}/${authorId}`)
      setSupportExist(res.data.isSupport);
    }
    checkUserSupport()
  })
    
    


  return (
    <>
      <div className="header__wrapper">
        <header></header>
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              {
                author.photo?
                <img src={author.photo} alt={author.name} />:
                <img src={user} alt={author.name} />
              }
            </div>
            <h2>{author.name}</h2>
           {
            supportExist? <Button className="unsupport" style={{ margin: "20px",color:"black",background:"#dfdada",border:"none" }} onClick={()=>handleSupport(author._id)}>
            <b>UNSUPPORT</b>
          </Button>:
           <Button className="support" style={{ margin: "20px" }} onClick={()=>handleSupport(author._id)}>
           <b>SUPPORT</b>
         </Button>
           }
            {exist ? (
              <Link to={"/authorChat"}>
                <Button className="support">
                  <b>CHAT</b>
                </Button>
              </Link>
            ) : (
              <Button className="support" onClick={handleChat}>
                <b>CHAT</b>
              </Button>
            )}

            <ul className="about">
              <li>
                <span>{supportCount !=null? supportCount:author.support?.length}</span>
                <b>Support</b>
              </li>
              {/* <li>
                <span></span>
              </li> */}
              <li>
                <span>{author.blogs?.length}</span>
                <b>Total Blogs</b>
              </li>
            </ul>

            <div className="content">
              {/* <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Morbi imperdiet, mauris
              ac auctor dictum, nisl ligula egestas nulla.
            </p> */}

              <ul className="aithor-icons">
                <li>
                  <i class="ri-twitter-fill"></i>
                </li>
                <li>
                  <i class="ri-facebook-circle-fill"></i>
                </li>
                <li>
                  <i class="ri-instagram-fill"></i>
                </li>
                <li>
                  <i class="ri-telegram-fill"></i>
                </li>
              </ul>
              <h3>BLOGS</h3>
              <hr />
            </div>
          </div>
          <div className="">
            <Row>
              <AuthorBlogs authorId={authorId}/>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorPage;
