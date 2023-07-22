import React, { useEffect, useState } from "react";
import "./latest-blog.css";
import BlogCard from "../BlogCard/BlogCard";
import { Col} from "reactstrap";
import axios from "../../utils/axios";

function LatestBlog() {
  const [latesteBlog, setlatesteBlog] = useState([]);

  useEffect(() => {
    const getHomeBlog = async () => {
      const res = await axios.get("/getHomeBlogs");
      console.log(res, "oooooooooo");
      setlatesteBlog(res.data);
    };
    getHomeBlog();
  }, []);

  return (
    <>
      {/* <Container> */}

      {latesteBlog?.map((blog, index) => {
        return (
          <Col
            lg="4"
            className="blog-card"
            style={{ marginTop: "5px" }}
            key={index}
          >
            <BlogCard blog={blog} />
          </Col>
        );
      })}
      {/* </Container> */}
    </>
  );
}

export default LatestBlog;
