import React, { useEffect, useState } from "react";
import BlogCard from "../BlogCard/BlogCard";
import { Col, Container, Row } from "reactstrap";
import axios from "../../utils/axios";

function AuthorBlogs({authorId}) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getOtherBlog = async () => {
      const res = await axios.get(`/getOtherBlogs/${authorId}`);
    //   console.log(res.data.blogs);
      setBlogs(res.data.blogs);
    
    };
    getOtherBlog();
  }, []);
 

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

export default AuthorBlogs;
