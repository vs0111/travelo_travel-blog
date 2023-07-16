import React, { useState, useEffect } from "react";
import "./home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assets/images/hero-img01.jpg";
import heroImg02 from "../../assets/images/hero-img02.jpg";
import heroVideo from "../../assets/images/hero-video.mp4";
import Subtitle from "../../shared/Subtitle";
import worldImg from "../../assets/images/world.png";
import SearchBar from "../../shared/SearchBar/SearchBar";
import Testimonial from "../../components/Testimonial/Testimonial";
import NewsLetter from "../../shared/NewsLetter/NewsLetter";
import LatestBlog from "../../components/LatestBlog/LatestBlog";

function Home() {


  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle sub={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling opens the door to creating{" "}
                  <span className="highlight">"memories"</span>
                </h1>
                <p>
                  Travel quotes are there to express the feeling you experienced
                  while traveling. Combine the best travel quotes with the power
                  of an image and instantly let people have a taste of your
                  travel feelings{" "}
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
          </Row>
          {/* <SearchBar/> */}
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="review.length mb-5 mt-0">
              <Subtitle sub={"Explore"} />
            </Col>
          </Row>
          </Container>

          <div className="latest gap-2">
          <Container>
            <Row>
            <LatestBlog/>
            </Row>
          </Container>
            
          </div>

          
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle sub={"Meet the Heros"} />
              <h2 className="testimonial__title">Popular Authors</h2>
            </Col>
            {/* <Col lg="12"> */}
              <Testimonial />
            {/* </Col> */}
          </Row>
        </Container>
        <NewsLetter />
      </section>
    </>
  );
}

export default Home;
