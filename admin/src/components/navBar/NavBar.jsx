import React from "react";
import "./nav-bar.scss";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import MenuIcon from "@mui/icons-material/Menu";
import admins from "../../assets/images/user.png";
import { useSelector } from "react-redux";

function NavBar() {



const admin=useSelector((state)=>state.admin)






  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder='Search...' /> */}
          {/* <SearchIcon/> */}
        </div>
        <div className="items">
          <div className="item">
            {/* <NotificationsActiveIcon className='icon'/> */}
            {/* Notification */}
          </div>
          <div className="item">
            {/* <NotificationsActiveIcon  className='icon'/> */}
            {/* Notification */}
          </div>
          <div className="item">
            {/* <NotificationsActiveIcon  className='icon'/> */}
            {/* <div className="counter">1</div>                   */}
          </div>
          <div className="item">
            {/* <NotificationsActiveIcon  className='icon'/> */}
            {/* <div className="counter">1</div> */}
          </div>
          <div className="item">
            <img src={admins} style={{ width: "30px " }} alt="" />
            <h3 style={{ paddingLeft: "2px" }}>{admin.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
