import "./post.css";
import { useEffect, useState } from "react";
import user from "../../assets/images/user.png";
import { DeleteOutlined } from "@mui/icons-material";
import axios from "../../utils/axios";
import heart from "../../assets/images/heart.png";
import likes from "../../assets/images/like.png";
import {useSelector} from 'react-redux'
import Swal from 'sweetalert2'

export default function Post() {
  const [media, SetMedia] = useState();
  const [like,setLike]=useState(null)
  const [postId,setPostId]=useState('')
  const user=useSelector((state)=>state.user)
  const userId=user._id

    

  useEffect(() => {
    const getMedia = async () => {
      const res = await axios.get("/getMedia");
      console.log(res.data);
      SetMedia(res.data);
    };
    getMedia();
  },[]);
  

    const getLikeCount = async (postId)=>{
      console.log(postId);
      // const res= await axios.get()
    }
  

  const handleLike = async (postId)=>{
    const Id={
      userId,
      postId
    }
    try {
      const res=await axios.patch('/likePost',Id)
      console.log(res.data);
      setPostId(res.data.postId)
      setLike(res.data.likesCount)
    } catch (error) {
      
    }
  }
  const handleDelete = async (postId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this post!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      });
  
      if (result.isConfirmed) {
        const res = await axios.delete(`/deletePost/${postId}`);
        SetMedia(res.data);
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your post is safe!', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete the post.', 'error');
    }
  };


  return (
    <>
      <div className="post">
        {media?.map((data) => (
          <div className="postWrapper" key={data._id}>
            <div className="postTop">
              <div className="postTopLeft">
                {
                  data.userPic?
                  <img
                  className="postProfileImg"
                  style={{ height: "35px",width:"35px" }}
                  src={data.userPic}
                  alt="post"
                />:
                <img
                  className="postProfileImg"
                  style={{ height: "35px",width:"35px" }}
                  src={user}
                  alt="post"
                />
                }
                <h6>{data.userName}</h6>
                <span className="postUsername mt-2">
                  <i style={{marginLeft:"10px"}} class="ri-map-pin-fill "></i>
                  {data.location}
                </span>
               {/* <span className="postDate">datae</span> */}
              </div>
              <div className="postTopRight">
               {
                data.userId===userId?
                <DeleteOutlined onClick={()=>handleDelete(data._id)} />:""
               }
              </div>
            </div>
            <div className="postCenter">
              {/* <span className="postText">des</span> */}
              <img
                className="postImg"
                src={data.photo}
                // style={{ height: "400px" }}
                alt=""
              />
            </div>
            <hr />
            <div className="postBottom" onLoad={()=>getLikeCount(data._id)}>
              <div className="postBottomLeft" onClick={()=>handleLike(data._id)}>
                <img
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
                  className="likeIcon"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  src={heart}
                  alt=""
                /> {
                  postId===data._id ?
               
                  like !== null ? like : data.likes?.length :data.likes?.length
                }
                
                
              </div>
              <div className="postBottomRight">
                {/* <AiOutlineComment className="commentIcon" /> */}
                {/* 20 */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
