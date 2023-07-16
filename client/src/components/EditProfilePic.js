import React, { useState, useRef } from "react";
import { Button, Form, Card } from "react-bootstrap";
import firebaseApp from "../FireBase/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const storage = getStorage(firebaseApp);

function EditProfilePic() {
  const [img, setImg] = useState();
  const locaRef = useRef();
  const user = useSelector((state) => state.user);
  const userName = user.name;
  const userId = user._id;
  const navigate=useNavigate()
  console.log()

  const handleUpload = async () => {
    if (!img) return null; // Return null if file is empty

    const imageRef = ref(storage, img.name); // Use file name as the reference

    try {
      await uploadBytes(imageRef, img);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl; // Return the image URL
    } catch (error) {
      console.log(error.message);
      return null; // Return null if there's an error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const location = locaRef.current.value;
    const imageUrl = await handleUpload(); // Await the result of handleUpload function

    if (imageUrl) {
      const mediaDetails = {
        location,
        userName,
        userId,
        photo: imageUrl, // Include the image URL in the blogDetails object
      };
      try {
        const res=await axios.post("/addMedia", mediaDetails);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
      window.location.reload()
    }
  };

  return (
    <>
      {img ? (
        <div>
          <img
            style={{ width: "170px", height: "170px" }}
            src={URL.createObjectURL(img)}
            alt=""
          />
        </div>
      ) : (
        " "
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location"
          style={{
            margin: "10px 0",
            width: "38%",
            marginRight: "30px",
            height: "40px",
            borderRadius: "5px",
            marginLeft: "5px",
          }}
          name="location"
          ref={locaRef}
        />
        <Form.Group style={{ margin: "23px 0" }}>
          <Form.Control
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
            type="file"
          />
        </Form.Group>
        <Button type="type" onClick={handleUpload}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default EditProfilePic;
