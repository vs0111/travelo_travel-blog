import React, { useState,useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Modal,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import img from "../../assets/images/user.png";
import { useSelector, useDispatch } from "react-redux";
import { ModalBody, ModalFooter, Table } from "reactstrap";
import EditProfile from "../../components/EditProfile/EditProfile";
import axios from "../../utils/axios";
import EditPic from "../../components/Editpic";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [fileShow,setFileShow]=useState(false)
  const [blog,setBlog]=useState()

  // const userId=user._id

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleImg=()=>{
    setFileShow(true)

  }
  const handleImgClose=()=>{
    setFileShow(false)
  }

//   useEffect(() => { 
//      axios.get(`blogDetails/${userId}`).then((response) => {
//          console.log(response.data);
//          setBlog(response.data);
//        });
//   }, [])


 


  return (
    <Container>
    <section style={{ backgroundColor: "#eee",padding:"0px 0px" }}>
      
        <Row>
          <Col lg="3">
            <Card className="mb-4 mt-1" style={{height:"370px"}} >
              <Card.Body className="text-center" >
               {
                user.photo?  <Card.Img
                src={user.photo}
                alt="avatar"
                className="rounded-circle"
                style={{ width: "150px" }}
                fluid
              />:
              <Card.Img
              src={img}
              alt="avatar"
              className="rounded-circle"
              style={{ width: "150px" }}
              fluid
            />
               }
                <p className="text-muted mb-1 mt-2">
                  <h5 style={{marginLeft:"50px"}}>
                    <b>{user?.name}</b>
                  </h5>
                </p>
                <p className="text-muted mb-4" style={{marginLeft:"40px"}}>AUTHOR</p>
                <div className="d-flex justify-content-center mb-2 gap-3">
                  <Button className="btn btn-primary" onClick={handleImg}>EDIT</Button>
                  {/* <Button className="btn btn-danger" onClick={handleRemobve}>Remove</Button> */}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="9">
            <Card className="cardbody mt-1" style={{height:"370px"}}>
              <Card.Body>
                {
                  user?.pename ?
                  <Row>
                  {/* <Col sm="3">
                    <p>Pen Name</p>
                  </Col> */}
                 
                </Row>:""
                }
               
                <Row>
                  <Col sm="3">
                    <p>Full Name</p>
                  </Col>
                  <Col sm="9">
                    <p className="text-muted">
                      <b>{user.name}</b>
                    </p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <p>Email</p>
                  </Col>
                  <Col sm="9">
                    <p className="text-muted">
                      <b>{user.email}</b>
                    </p>
                  </Col>
                </Row>
                <hr />

                <Row>
                  <Col sm="3">
                    <p>Phone</p>
                  </Col>
                  <Col sm="9">
                    <p className="text-muted">
                      <b>{user.phone}</b>
                    </p>
                  </Col>
                </Row>
                <div className="d-flex mt-4  mb-2 gap-3">
                  <Button
                    className=""
                    style={{ backgroundColor: "#ff7e01", border: "none" }}
                    onClick={handleShow}
                  >
                    Edit Profile
                  </Button>
                  {/* <Button className="btn btn-primary mr-3 ">Add Link</Button> */}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    
      <Modal show={show}>
        <ModalHeader>
          <ModalTitle>EDIT PROFILE</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <EditProfile  />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal show={fileShow}>
        <ModalHeader>
          <ModalTitle>EDIT PROFILE</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <EditPic/>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleImgClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </section>
    </Container>
  );
}
