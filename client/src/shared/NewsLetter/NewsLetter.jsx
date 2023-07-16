import React from "react";
import "./newletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../../assets/images/male-tourist.png";

function NewsLetter() {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe Now to get usefull travelling information.</h2>
              <div className="newsletter__input">
                <input type="text" placeholder="Enter Your email" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>
              <p>
                "Join our newsletter and never miss out on the latest travel
                tips, destination guides, and exclusive offers!"
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default NewsLetter;
