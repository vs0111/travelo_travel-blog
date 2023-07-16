import React, { useState } from "react";
import "./check-box.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



function CheckBox({blogID,setShowFun}) {
  const [selectedOption, setSelectedOption] = useState("");
  const user=useSelector((state)=>state.user)
  const navigate=useNavigate()

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // console.log(selectedOption);
    if(selectedOption){
        const reportDetails={
            blogID,
            userId:user._id,
            reasons: selectedOption,
        }
        try {
            const res=await axios.post('/reportblog',reportDetails)
            console.log(res);
            if(res.status===200){
              toast.success(res.data.msg)
              setTimeout(() => {
              
                setShowFun(false)
              }, 2000);
            }
           
        } catch (error) {
            
        }
    
    
    }
  };

  return (
    <div>
      <ToastContainer/>
      <form>
        <div className="check-box">
          <input
            className="input"
            type="radio"
            name="option"
            id="option1"
            value="Inappropriate or offensive content"
            checked={selectedOption === "Inappropriate or offensive content"}
            onChange={handleOptionChange}
          />
          <label className="label" htmlFor="option1">
            Inappropriate or offensive content
          </label>
        </div>

        <div className="check-box">
          <input
            className="input"
            type="radio"
            name="option"
            id="option2"
            value="Plagiarism or copyright infringement"
            checked={selectedOption === "Plagiarism or copyright infringement"}
            onChange={handleOptionChange}
          />
          <label className="label" htmlFor="option2">
            Plagiarism or copyright infringement
          </label>
        </div>

        <div className="check-box">
          <input
            className="input"
            type="radio"
            name="option"
            id="option3"
            value="Misinformation or fake news"
            checked={selectedOption === "Misinformation or fake news"}
            onChange={handleOptionChange}
          />
          <label className="label" htmlFor="option3">
            Misinformation or fake news
          </label>
        </div>

        <div className="check-box">
          <input
            className="input"
            type="radio"
            name="option"
            id="option4"
            value="Harmful advice or practices"
            checked={selectedOption === "Harmful advice or practices"}
            onChange={handleOptionChange}
          />
          <label className="label" htmlFor="option4">
            Harmful advice or practices
          </label>
        </div>

        <div className="check-box">
          <input
            className="input"
            type="radio"
            name="option"
            id="option5"
            value="Non-disclosure of sponsored content"
            checked={selectedOption === "Non-disclosure of sponsored content"}
            onChange={handleOptionChange}
          />
          <label className="label" htmlFor="option5">
            Non-disclosure of sponsored content
          </label>
        </div>

        <div className="check-box">
          <input
            className="input"
            type="radio"
            name="option"
            id="option6"
            value="Unauthorized use of personal information"
            checked={selectedOption === "Unauthorized use of personal information"}
            onChange={handleOptionChange}
          />
          <label className="label" htmlFor="option6">
            Unauthorized use of personal information
          </label>
        </div>

        <div className="check-box">
          <input
            className="input"
            type="radio"
            name="option"
            id="option7"
            value="Non-compliance with travel regulations"
            checked={selectedOption === "Non-compliance with travel regulations"}
            onChange={handleOptionChange}
          />
          <label className="label" htmlFor="option7">
            Non-compliance with travel regulations
          </label>
        </div>

        <div className="check-box">
          <input
            className="input"
            type="radio"
            name="option"
            id="option8"
            value="Other"
            checked={selectedOption === "Other"}
            onChange={handleOptionChange}
          />
          <label className="label" htmlFor="option8">
            Other
          </label>
        </div>

        <Button
          style={{ backgroundColor: "red", color: "white", marginLeft: "15px", marginTop: "10px" }}
          type="submit"
          onClick={handleSubmit}
        >
          REPORT
        </Button>
      </form>
    </div>
  );
}

export default CheckBox;
