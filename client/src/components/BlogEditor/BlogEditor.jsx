import React, { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../FireBase/config";
import "./blogEditer.css";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import QuilEditor from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import Button from "@mui/material/Button";

const storage = getStorage(firebaseApp);

function App() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error,setError]=useState("")
  const [optinCategory,setOptinCategory]=useState([])

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = user.name;
  const userId = user._id;

  useEffect(()=>{
    const getCategory= async ()=>{
      const res=await axios.get('/getClientCategory')
      setOptinCategory(res.data);
    }
    getCategory()
  },[])



  const handleUpload = async () => {
    if (!file) return null;

    const imageRef = ref(storage, file.name);

    try {
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const validateForm = () => {
    if (!file) {
      toast.error("Please select a cover photo");
      return false;
    }

    if (!title) {
      toast.error("Please enter a title");
      return false;
    }
    console.log(title.length);

    if (title.length <= 50) {
      toast.error("Title should be less than or equal to 50 characters");
      return false;
    }

    if (!location) {
      toast.error("Please enter a location");
      return false;
    }

    if (!content) {
      toast.error("Please enter content");
      return false;
    }

    if (content.length<=500) {
      toast.error("Content should be less than or equal to 500 characters");
      setError("ERROR")
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const imageUrl = await handleUpload();

    if (imageUrl) {
      const blogDetails = {
        title,
        location,
        category,
        content,
        userName,
        userId,
        photo: imageUrl,
      };

      try {
        setTimeout(() => {
          navigate("/dashBoard");
        }, 1000);
        const response = await axios.post("/addBlog", blogDetails);
        console.log(response.data.message);
        toast.success(response.data.message);
       

        setTitle("");
        setLocation("");
        setCategory("");
        setContent("");
        setFile(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please select a cover photo");
    }
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }, "blockquote"],
      [{ script: "sub" }, { script: "super" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      ["code-block", "link", "image"],
    ],
  };

  return (
    <Container>
      <ToastContainer />
      <div className="card">
        <h2>SHARE YOUR BLOG</h2>
        <div className="form mt-5">
          {file && (
            <img
              className="writeImg"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}

          <form onSubmit={handleSubmit}>
            <div className="writeFormGroup">
              <label htmlFor="fileInput">
                <i className="writeIcon ri-add-fill"></i>
              </label>
              <label style={{ paddingLeft: "5px", fontWeight: "300" }}>
                Choose Cover Photo
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <input
              style={{ margin: "10px 0", width: "80%" }}
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              type="text"
              placeholder="Location"
              style={{
                margin: "10px 0",
                width: "38%",
                marginRight: "30px",
                height: "40px",
                borderRadius: "5px",
                marginLeft: "30px",
              }}
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <select
              style={{
                margin: "10px 0",
                width: "38%",
                marginRight: "30px",
                height: "40px",
                borderRadius: "5px",
              }}
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="option1"></option>
              {
                 
                optinCategory?.map((cat)=>(
                  <option value={cat.category}>{cat.category}</option>
                ))
              }
            </select>
            <QuilEditor
              name="content"
              theme="snow"
              modules={modules}
              value={content}
              onChange={setContent}
              placeholder="Start typing your blog..."
            />
            {error}
            {content?content.length:""}

            <Button
              onClick={handleUpload}
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

export default App;
