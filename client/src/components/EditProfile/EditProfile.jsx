import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { setUser } from "../../Redux/store";
import { useNavigate } from "react-router-dom";

function EditProfile({handleEditShow}) {
  const [editedFormData, setEditedFormData] = useState({
    name: "",
    email: "",
  });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleChange = e => {
  //     setEditedFormData({ ...editedFormData, [e.target.name]: e.target.value })
  //     console.log(editedFormData);
  //   }

  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;

    axios
      .post(`/editProfile/${user._id}`, {name, email })
      .then((response) => {
        console.log(response.data.updatedUser);
        dispatch(setUser({ user: response.data.updatedUser }));
        toast.success("Profile Updated Successfully");
        setTimeout(() => {
          handleEditShow(false)
        }, 1000);
      });
  };

  return (
    <>
      <ToastContainer />
      <Form className="gap-2">
        <Form.Group handleImgClose>
        </Form.Group>
        <Form.Group style={{ margin: "23px 0" }}>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            required
            Value={user.name}
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group style={{ margin: "23px 0" }}>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            required
            Value={user.email}
            ref={emailRef}
          />
        </Form.Group>

        <Button variant="success" type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </Form>
    </>
  );
}

export default EditProfile;
