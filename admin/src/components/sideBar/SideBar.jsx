import React from "react";
import "./side-bar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CategoryIcon from "@mui/icons-material/Category";
import CastIcon from "@mui/icons-material/Cast";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../Redux/store";
import Swal from "sweetalert2";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be Logout..",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout..",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logout!", "Your file has been Logouted.", "success");
        dispatch(setLogout());
        navigate("/");
      }
    });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="log">TRAVELO</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>
              <Link className="link" to="/">
                Dashboard
              </Link>
            </span>
          </li>
          <p className="title">LISTS</p>
          <li>
            <GroupIcon className="icon" />
            <span>
              <Link className="link" to="/users">
                Users
              </Link>
            </span>
          </li>
          <li>
            <AutoStoriesIcon className="icon" />
            <span>
              <Link className="link" to="/authors">
                Authors
              </Link>
            </span>
          </li>
        
          <li>
            <CategoryIcon className="icon" />
            <span>
              <Link className="link" to="/category">
                Category
              </Link>
            </span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <ReportGmailerrorredIcon className="icon" />
            <span> 
            <Link className="link" to="/report">
                Reportes
              </Link>
              </span>
          </li>
          {/* <li>
            <CastIcon className="icon" />
            <span>ADD Management</span>
          </li> */}
          <li onClick={logout}>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
          {/* <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li> */}
        </ul>

      </div>
        <hr style={{marginTop:"30px"}} />
      
    </div>
  );
}

export default SideBar;
