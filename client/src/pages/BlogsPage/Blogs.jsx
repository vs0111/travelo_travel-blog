import React, { useState,useEffect } from "react";
import "./blog.css";
import { Container, Row } from "reactstrap";
import axios from '../../utils/axios'
import FullBlog from "../../components/FullBlog";

const categoryNames = ["All", "Adventure", "SoloTrip", "CoupleTrip","Cultural","AirTrip","RoadTrip","WaterTrip"];


const Blogs = () => {
  const [query,setQuery]=useState("")
  const [selectedCategory, setSelectedCategory] = useState("All");
  console.log(selectedCategory);

  return (
    <>
      <Container>
        <div className="category-header">
          {categoryNames.map((categoryName, index) => (
            <div className="category-box" key={index} onClick={() => setSelectedCategory(categoryName)}>
            <h6>{categoryName}</h6>
          </div>
          ))}
          <div className="search-bar-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search Location..."
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginLeft: "-50px" }}>
          <Row>
           <FullBlog query={query} selectedCategory={selectedCategory.toUpperCase()} />
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Blogs;
