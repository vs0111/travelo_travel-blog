import React, { useEffect, useRef, useState } from "react";
import "./edit-cat.scss";
import { Button } from "reactstrap";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file for React Toastify
import { useNavigate, useParams } from "react-router-dom";

function EditCat({ head }) {
  const [editCat, seteditcat] = useState("");
  const navigate = useNavigate();
  const cat = useParams();
  const catId = cat.id;
  const catRef = useRef();

  //   console.log(catId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editCategory = catRef.current.value;
    const editData = {
      catId,
      editCategory,
    };
    try {
      const res = await axios.patch("/admin/editCategory", editData);
      console.log(res);
      if (res.status === 200) {
        toast.success("Category Updated Successfully");
        setTimeout(() => {
          navigate("/category");
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  useEffect(() => {
    const getEditCat = async () => {
      const res = await axios.get(`/admin/getEditCategory/${catId}`);
      seteditcat(res.data.category);
    };
    getEditCat();
  }, [catId]);

  return (
    <>
      <div className="card">
        <h2>{head}</h2>
        <ToastContainer
          position="top-right" // Set the position of the toast container
          autoClose={3000} // Close the toast after 3 seconds
          hideProgressBar // Hide the progress bar
          newestOnTop={false} // Display newer toasts below older ones
          closeOnClick // Close the toast when clicked
          pauseOnHover // Pause the toast when hovered
          draggable // Allow dragging the toast
          pauseOnFocusLoss // Pause the toast when focus is lost from the window
          className="toast-container" // Add a custom class for styling
          toastClassName="toast" // Add a custom class for individual toasts
          bodyClassName="toast-body" // Add a custom class for the toast body
          closeButton={false} // Hide the close button
        />

        <div className="form mt-5">
          <form>
            <div className="writeFormGroup">
              <input
                type="text"
                placeholder="Category"
                style={{
                  marginTop: "50px",
                  width: "80%",
                  marginRight: "30px",
                  height: "30px",
                  borderRadius: "5px",
                  marginLeft: "0px",
                }}
                name="location"
                Value={editCat}
                ref={catRef}
                // onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <Button
              style={{
                backgroundColor: "blue",
                color: "white",
                marginTop: "10px",
                borderRadius: "5px",
                width: "80px",
                height: "40px",
                fontSize: "15px",
                border: "none",
                fontWeight: "800",
              }}
              type="submit"
              onClick={handleSubmit}
            >
              EDIT
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditCat;
