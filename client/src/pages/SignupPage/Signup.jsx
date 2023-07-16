import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
import loginImg from "../../assets/images/login.png";
import userIcon from "../../assets/images/user.png";
import axios from "../../utils/axios";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    console.log(signupData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/signup", signupData)
      .then((response) => {
        console.log(response.data);

        toast.success("Successfully Signed");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data.message);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <section>
      <ToastContainer />
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Signup</h2>
                <Form>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button
                    onClick={handleSubmit}
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Signup;
