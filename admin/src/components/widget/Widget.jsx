import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from "react-router-dom";



const Widget = ({ type,count }) => {
  let data;

  


  //temporary

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        count:count,
        isMoney: false,
        link: <Link style={{textDecoration:"none"}} to='/users'>View Users</Link>,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "authors":
      data = {
        title: "AUTHORS",
        isMoney: false,
        link: <Link style={{textDecoration:"none"}} to='/authors'>View Authors</Link>,
        icon: (
          <AutoStoriesIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "blogs":
      data = {
        title: "BLOGS",
        isMoney: true,
        link:"Blogs",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "reports":
      data = {
        title: "REPORTS",
        isMoney: true,
        link: <Link style={{textDecoration:"none"}} to='/report'>View Reports</Link>,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
        {count}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
