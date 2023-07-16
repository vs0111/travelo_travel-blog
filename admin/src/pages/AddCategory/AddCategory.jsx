import React from "react";
import "./add-category.scss";
import SideBar from "../../components/sideBar/SideBar";
import NavBar from "../../components/navBar/NavBar";
import AddCat from "../../components/AddCat/AddCat";

function AddCategory() {
  return (
    <>
      <div className="list">
        <SideBar />
        <div className="listContainer">
          <NavBar />
          <AddCat head={"ADD CATEGORY"}/>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
