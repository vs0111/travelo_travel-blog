import React from "react";
import "./manage-author.scss";
import SideBar from "../../components/sideBar/SideBar";
import NavBar from "../../components/navBar/NavBar";
import AuthorTable from "../../components/AuthorTable/AuthorTable";

function ManageAuthor() {
  return (
    <>
      <div className="list">
        <SideBar />
        <div className="listContainer">
          <NavBar />
          <AuthorTable />
        </div>
      </div>
    </>
  );
}

export default ManageAuthor;
