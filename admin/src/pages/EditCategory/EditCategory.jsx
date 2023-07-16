import React from "react";
import "./edit-category.scss";
import SideBar from "../../components/sideBar/SideBar";
import NavBar from "../../components/navBar/NavBar";
import AddCat from "../../components/AddCat/AddCat";
import EditCat from "../../components/EditCat/EditCat";

function EditCategory() {
  return (
    <>
      <div className="list">
        <SideBar />
        <div className="listContainer">
          <NavBar />
          <EditCat head={"EDIT CATEGORY"}/>
          
        </div>
      </div>
    </>
  );
}

export default EditCategory;
