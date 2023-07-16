import React, { useEffect, useState } from "react";
import "./report-table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../utils/axios";
import { Button } from "@mui/material";
import userPic from "../../assets/images/user.png";
import Swal from "sweetalert2";

const ReportTable = () => {
  const [reports, setReports] = useState([]);
  const [blogIds,setBlogIds] =useState("")
  

  useEffect(() => {
    const getReport = async () => {
      const res = await axios.get("/admin/getAllReports");
      setReports(res.data);
    };
    getReport();
  }, []);

  //   useEffect(() => {
  //     axios.get("/getUser").then((response) => {
  //       console.log(response.data);
  //       setUsers(response.data);
  //     });
  //   }, []);

  //   const handleBlock = async (userId) => {
  //     try {
  //       const response = await Swal.fire({
  //         title: "Confirmation",
  //         text: "Are you sure you want to block/unblock this user?",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes",
  //         cancelButtonText: "No",
  //         reverseButtons: true,
  //         focusCancel: true,
  //       });

  //       if (response.isConfirmed) {
  //         const updatedUsers = users.map((user) => {
  //           if (user._id === userId) {
  //             return { ...user, block: !user.block }; // Toggle the block state
  //           }
  //           return user;
  //         });

  //         setUsers(updatedUsers);

  //         if (updatedUsers.find((user) => user._id === userId)?.block) {
  //           await axios.patch(`/blockUser/${userId}`); // Block user API
  //           Swal.fire({
  //             icon: "success",
  //             title: "User Blocked!",
  //             text: "The user has been blocked successfully.",
  //           });
  //         } else {
  //           await axios.patch(`/unblockUser/${userId}`); // Unblock user API
  //           Swal.fire({
  //             icon: "success",
  //             title: "User Unblocked!",
  //             text: "The user has been unblocked successfully.",
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       // Handle error if the request fails
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "An error occurred. Please try again later.",
  //       });
  //     }
  //   };
  const handleDisable = async (blogId) => {
    try {
      const response = await Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to disable this blog?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
        focusCancel: true,
      });
  
      if (response.isConfirmed) {
        const res = await axios.patch(`/admin/disableBlog/${blogId}`);
        const updatedReports = reports.map((report) => {
          if (report._id === blogId) {
            return { ...report, blog: { ...report.blog, isDisabled: true } };
          }
          return report;
        });
        setReports(updatedReports);
        Swal.fire({
          icon: "success",
          title: "Blog Disabled!",
          text: "The blog has been disabled successfully.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while disabling the blog. Please try again later.",
      });
    }
  };
  
  const handleEnable = async (blogId) => {
    try {
      const response = await Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to enable this blog?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
        focusCancel: true,
      });
  
      if (response.isConfirmed) {
        const res = await axios.patch(`/admin/enableBlog/${blogId}`);
        const updatedReports = reports.map((report) => {
          if (report._id === blogId) {
            return { ...report, blog: { ...report.blog, isDisabled: false } };
          }
          return report;
        });
        setReports(updatedReports);
        Swal.fire({
          icon: "success",
          title: "Blog Enabled!",
          text: "The blog has been enabled successfully.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while enabling the blog. Please try again later.",
      });
    }
  };
  
  

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">No.</TableCell>
            <TableCell className="tableCell">BLOGS</TableCell>
            <TableCell className="tableCell">AUTHOUR</TableCell>
            <TableCell className="tableCell">TOTALREPORTS</TableCell>
            <TableCell className="tableCell">REPORTEDBY</TableCell>
            <TableCell className="tableCell">REPORTMESSAGE</TableCell>
            {/* <TableCell className="tableCell">Total Blogs</TableCell> */}
            <TableCell className="tableCell">REMOVEBLOG</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow>
              <TableCell className="tableCell" key={index}>
                {index + 1}
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={report.blog.photo} alt="user" className="images" />

                  <b> {report.blog.title.substring(0, 20)}...</b>
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {report.blog.userName}
              </TableCell>

              <TableCell className="tableCell">{report.count}</TableCell>

              <TableCell className="tableCell">
                {report.reportedByUsers.map((user) => (
                  <p>@{user.name}</p>
                ))}
              </TableCell>
              <TableCell className="tableCell">
                {report.reasons.map((message) => (
                  <p>{message}</p>
                ))}
              </TableCell>

              <TableCell className="tableCell">
                {report.blog.isDisabled? (
                  <Button
                    style={{ background: "green", color: "#ffff" }}
                    onClick={() => handleEnable(report._id)}
                  >
                    Enable
                  </Button>
                ) : (
                  <Button
                    style={{ background: "red", color: "#ffff" }}
                    onClick={() => handleDisable(report._id)}
                  >
                    Disable
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
