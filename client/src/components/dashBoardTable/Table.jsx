import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import Swal from "sweetalert2";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashTable = ({ blog,childSetBlog }) => {
  // console.log(blog);
  const navigate = useNavigate();
  const userId=useSelector((state)=>state.user._id)

  const handlDelete = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be Delete this Blog",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete..",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been Deleted.", "success");
        const res = await axios.delete(`/deleteBlog/${blogId}/${userId}`);
        console.log(res.data);
        if(res.data.existingBlog)
        childSetBlog(res.data.existingBlog)
        
      }
    });
  };
      


  return (
    <TableContainer component={Paper} className="table mt-1">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">No.</TableCell>
            <TableCell className="tableCell">POST</TableCell>
            <TableCell className="tableCell">Category</TableCell>
            <TableCell className="tableCell">Posted</TableCell>
            <TableCell className="tableCell">Views</TableCell>
            <TableCell className="tableCell">Edit</TableCell>
            <TableCell className="tableCell">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blog?.map((item, index) => (
            <TableRow>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={item.photo} alt="" className="image" />
                  <Link
                    to={`/singlePost/${item._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {" "}
                    {item.title.substring(0, 50)}...
                  </Link>
                </div>
              </TableCell>
              <TableCell className="tableCell">{item.category}</TableCell>
              <TableCell className="tableCell">
                {format(item.createdAt)}
              </TableCell>
              <TableCell className="tableCell">{item.views.length}</TableCell>
              {/* <TableCell className="tableCell">mETHY</TableCell> */}
              <TableCell className="tableCell">
                <span>
                  <Link to={`/editBlog/${item._id}`}>
                    <EditCalendarIcon
                      style={{ width: "40px", color: "black" }}
                    />
                  </Link>
                </span>
              </TableCell>
              <TableCell className="tableCell">
                <span onClick={() => handlDelete(item._id)}>
                  <DeleteIcon style={{ width: "40px", color: "black" }} />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashTable;
