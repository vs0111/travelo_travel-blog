import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard/BlogCard";
import { Col, Container, Row } from "reactstrap";
import axios from "../utils/axios";
import DashTable from "./dashBoardTable/Table";
import Fallback from "./FallBack";

function FullBlog({ query,selectedCategory }) {
  console.log(query);
  const [blogs, setBlogs] = useState([]);

  const search = (data) => {
    return data.filter(
      (item) =>
        item.location.toLowerCase().includes(query) &&
        (selectedCategory === "ALL" || item.category.replace(/\s/g, '') === selectedCategory)
    );
  };

  useEffect(() => {
    axios.get("/getAllBlogs").then((response) => {
      console.log(response.data);
      setBlogs(response.data);
    });
  }, []);

  const filteredBlogs = search(blogs);

  return (
    <>
      {filteredBlogs.length === 0 ? (
       <Fallback query={query} selectedCategory={selectedCategory}/>
      ) : (
        <Container>
          <Row>
            {filteredBlogs.map((blog, index) => (
              <Col lg="4" className="blog-card" style={{ marginTop: "5px" }} key={index}>
                <BlogCard blog={blog} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default FullBlog;
