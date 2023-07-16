import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import firebaseApp from "../FireBase/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector ,useDispatch} from "react-redux";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../Redux/store";
import { ToastContainer, toast } from "react-toastify";


const storage = getStorage(firebaseApp);

function EditPic() {
  const [file, setFile] = useState();
  const locaRef = useRef();
  const user = useSelector((state) => state.user);
  const userName = user.name;
  const userId = user._id;
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const handleUpload = async () => {
    if (!file) return null;

    const imageRef = ref(storage, file.name);

    try {
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
    useEffect(()=>{
      const updateProfile=async()=>{
        const imageUrl = await handleUpload();
        if(imageUrl){
          const res=await axios.patch('/updateProfie',{imageUrl,userId})
          console.log(res.data);
          dispatch(setUser({ user: res.data }));
          toast.success("Profile Updated Successfully");
        setTimeout(() => {
         window.location.reload()
        }, 0);

        }
 
       
      }
      updateProfile()

    },[file])   

 

  return (
    <>
    <ToastContainer/>
      {file ? (
        <div>
          <img
            style={{ width: "170px", height: "170px" }}
            src={URL.createObjectURL(file)}
            alt=""
          />
        </div>
      ) : (
        " "
      )}

      <Form  >
        <Form.Group style={{ margin: "23px 0" }}>
          <Form.Control
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            type="file"
          />
        </Form.Group>
        <Button  >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default EditPic;
