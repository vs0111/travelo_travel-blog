import React, { useEffect, useState } from "react";
import "./latest-blog.css";
import BlogCard from "../BlogCard/BlogCard";
import { Col, Container, Row } from "reactstrap";
import axios from "../../utils/axios";

function LatestBlog() {
  const [blogs, setBlogs] = useState([]);

 useEffect(() => {
  
   return () => {
    axios.get("/getHomeBlogs").then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      });
   }
 }, [])
 

  return (
    <>
    {/* <Container> */}
      
      {blogs.map((blog, index) => {
       return( <Col lg="4"  className="blog-card" style={{marginTop:"5px"}} key={index}>
       <BlogCard blog={blog} />
     </Col>)
      })}
      {/* </Container> */}
    </>
  );
}

export default LatestBlog;
