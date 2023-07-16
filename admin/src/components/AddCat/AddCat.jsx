import React, {  useState } from "react";
import "./add-cat.css";
import { Button } from "reactstrap";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file for React Toastify
import { useNavigate } from "react-router-dom";

function AddCat({head}) {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category);
    if (category !== "") { // Changed the condition to check if category is not empty
      try {
        const res = await axios.post("/admin/addCategory", { category });
        if (res.status === 200) {
          toast.success("Category Added Successfully");
          setTimeout(() => {
            navigate("/category");
          }, 1000);
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      toast.error("Please Add Category Name");
    }
  };


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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <Button
              style={{
                backgroundColor: "green",
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
              ADD
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCat;
