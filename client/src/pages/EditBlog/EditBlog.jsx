import React, { useState, useRef } from "react";
import './edit-blog.css'
import { Container} from "reactstrap";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import QuilEditor from "react-quill";
import "react-quill/dist/quill.bubble.css"; // import the styles
import "react-quill/dist/quill.snow.css"; // import the styles
import Button from "@mui/material/Button";
import { useEffect } from "react";



function EditBlog() {
  const navigate = useNavigate();
  const [blogs,setBlogs]=useState([])


  const user = useSelector((state) => state.user);
  const userName = user.name;
  const userId = user._id;
  const blog=useParams()
  const blogId=blog.id
  console.log(userName, userId);
  console.log(blogId);

  const titleRef = useRef();
  const catRef = useRef();
  const locaRef = useRef();
  const editorRef = useRef();



  useEffect(() => {
    axios.get(`/getOneBlog/${blogId}`).then((response)=>{
        setBlogs(response.data)
    })
    
  }, [])
  
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const location = locaRef.current.value;
    const category = catRef.current.value;
    const content = editorRef.current.value;
  
  
      const blogDetails = {
        title,
        location,
        category,
        content,
        userName,
        userId,
      };
  
      try {
        const response = await axios.put(`/editBlog/${blogId}`,blogDetails);
        console.log(response.data.message);
        toast.success("response.data.message")
        titleRef.current.value = "";
        locaRef.current.value = "";
        catRef.current.value = "";
        editorRef.current.value = "";
        navigate('/dashBoard')
      } catch (error) {
        console.log(error);
      }
    
  };
  

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }, "blockquote"],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      ["code-block", "link", "image"],
    ],
  };

  return (
    <Container>
      <ToastContainer />
      <div className="card">
        <h2>EDIT YOUR BLOG</h2>
        <div className="form mt-5">
          

          <form onSubmit={handleSubmit}>
        
            <input
              style={{ margin: "10px 0", width: "80%" }}
              type="text"
              name="title"
              Value={blogs.title}
              placeholder="Title"
              ref={titleRef}
            />
            <select
              style={{
                margin: "10px 0",
                width: "38%",
                marginRight: "30px",
                height: "40px",
                borderRadius: "5px",
                marginLeft: "30px",
              }}
              name="location"
              ref={locaRef}
              value={blogs.location}
              disabled

            >
              <option value="option1">Location</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
            <select
              style={{
                margin: "10px 0",
                width: "38%",
                marginRight: "30px",
                height: "40px",
                borderRadius: "5px",
              }}
              name="category"
              ref={catRef}
              value={blogs.category}
              disabled

            >
              <option value="option1">Category</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
            <QuilEditor
              name="content"
              theme="snow"
              modules={modules}
               ref={editorRef}
               
               value={blogs.content}
              
            />
            <Button
              style={{
                backgroundColor: "#faa935",
                color: "white",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              type="submit"
            >
              POST
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default EditBlog;
