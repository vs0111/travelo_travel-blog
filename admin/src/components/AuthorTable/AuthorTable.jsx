import React, { useEffect, useState } from "react";
import "./author-table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../utils/axios";
import { Button } from "reactstrap";
import userPic from "../../assets/images/user.png";
import Swal from "sweetalert2";

const AuthorTable = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get("/getAuthor").then((response) => {
      console.log(response.data);
      setAuthors(response.data);
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
        const updatedUsers = authors.map((user) => {
          if (user._id === userId) {
            return { ...user, block: !user.block }; // Toggle the block state
          }
          return user;
        });

        setAuthors(updatedUsers);

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
            <TableCell className="tableCell">Author Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Total Blogs</TableCell>
            {/* <TableCell className="tableCell">Total Blogs</TableCell> */}
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author, index) => (
            <TableRow key={author._id}>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {author.photo ? (
                    <img src={author.photo} alt="user" className="image" />
                  ) : (
                    <img src={userPic} alt="user" className="image" />
                  )}
                  {author.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{author.email}</TableCell>

              <TableCell className="tableCell">{author.blogs.length}</TableCell>
              <TableCell className="tableCell">
                <span className="tableCell">
                  {author.block ? (
                    <Button onClick={() => handleBlock(author._id)}>
                      UNBLOCK
                    </Button>
                  ) : (
                    <Button onClick={() => handleBlock(author._id)}>
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

export default AuthorTable;
