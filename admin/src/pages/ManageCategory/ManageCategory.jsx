import React from "react";
import "./manage-category.scss";
import SideBar from "../../components/sideBar/SideBar";
import NavBar from "../../components/navBar/NavBar";
import Category from "../../components/Category/Category";

function ManageCategory() {
  return (
    <>
      <div className="list">
        <SideBar />
        <div className="listContainer">
          <NavBar />
          <Category/>
        </div>
      </div>
    </>
  );
}

export default ManageCategory;
