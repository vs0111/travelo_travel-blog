import React, { useEffect, useState } from "react";
import "./user-table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../utils/axios";
import { Button } from "reactstrap";
import userPic from '../../assets/images/user.png'
import Swal from "sweetalert2";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/getUser").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  const handleBlock = async (userId) => {
    try {
      const response = await Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to block/unblock this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
        focusCancel: true,
      });
  
      if (response.isConfirmed) {
        const updatedUsers = users.map((user) => {
          if (user._id === userId) {
            return { ...user, block: !user.block }; // Toggle the block state
          }
          return user;
        });
  
        setUsers(updatedUsers);
  
        if (updatedUsers.find((user) => user._id === userId)?.block) {
          await axios.patch(`/blockUser/${userId}`); // Block user API
          Swal.fire({
            icon: "success",
            title: "User Blocked!",
            text: "The user has been blocked successfully.",
          });
        } else {
          await axios.patch(`/unblockUser/${userId}`); // Unblock user API
          Swal.fire({
            icon: "success",
            title: "User Unblocked!",
            text: "The user has been unblocked successfully.",
          });
        }
      }
    } catch (error) {
      // Handle error if the request fails
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred. Please try again later.",
      });
    }
  };
  
  

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Roll No.</TableCell>
            <TableCell className="tableCell">User Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Position</TableCell>
            {/* <TableCell className="tableCell">Total Blogs</TableCell> */}
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">{
                  user.photo?
                  <img src={user.photo} alt="user" className="image" />:
                  <img src={userPic} alt="user" className="image" />


                }
                  {user.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{user.email}</TableCell>
              {
                user.author?
                <TableCell className="tableCell">AUTHOR</TableCell>:
                <TableCell className="tableCell">USER</TableCell>

              }
              {/* <TableCell className="tableCell">2</TableCell> */}
              <TableCell className="tableCell">
                <span className="tableCell">
                  {user.block ? (
                    <Button  onClick={() => handleBlock(user._id)}>
                      UNBLOCK
                    </Button>
                  ) : (
                    <Button onClick={() => handleBlock(user._id)}>
                      BLOCK
                    </Button>
                  )}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
