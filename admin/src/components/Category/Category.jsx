import React, { useEffect, useState } from "react";
import "./category.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../utils/axios";
import { Container } from "reactstrap";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Category = () => {
  const [category, setCategory] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/admin/getCategory");
      setCategory(res.data);
    };
    getCategory();
  }, []);


  const handleDelete = async (catId) =>{
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
        const res = await axios.delete(`/admin/deleteCategory/${catId}`);
        console.log(res.data);
        if(res.status===200){
          setCategory(res.data)

        }
     
      }
    });

  }





  return (
    <>
      <Container>
        <TableContainer component={Paper} className="table">
          <Link to={"/addCategory"}>
            {" "}
            <Button className="add-button">ADD CATEGORY</Button>
          </Link>
          <hr />

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Roll No.</TableCell>
                <TableCell className="tableCell">Category Name</TableCell>
                <TableCell className="tableCell">Total Blogs</TableCell>
                <TableCell className="tableCell">EDIT</TableCell>

                <TableCell className="tableCell">DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((data, index) => (
                <TableRow>
                  <TableCell className="tableCell" key={data._id}>{index+1}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">{data.category}</div>
                  </TableCell>
                  <TableCell className="tableCell">grthgtr</TableCell>

                  <TableCell className="tableCell">
                   <Link to={`/editCategory/${data._id}`}> <Button style={{ background: "#11cdef", color: "#ffff" }}>
                      EDIT
                    </Button></Link>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className="tableCell">
                      <Button onClick={()=>handleDelete(data._id)} style={{ background: "red", color: "#ffff" }}>
                        DELETE
                      </Button>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Category;
