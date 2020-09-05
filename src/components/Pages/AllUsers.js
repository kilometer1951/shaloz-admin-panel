import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import { Pagination } from "@material-ui/lab";
import Spinner from "react-activity/lib/Spinner";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AllUsers = (props) => {
  const classes = useStyles();

  const admin = useSelector((state) => state.auth.admin);
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await actions.fetchUsers(page);
      setUsersData(response.data);
      setPageCount(response.pageCount);
      
    };
    fetchUsers();
  }, []);

  const handlePagination = async (event, page_number) => {
    setPage(page_number);
    setIsLoading(true);
    const response = await actions.fetchUsers(page_number);
    setIsLoading(false);
    setUsersData(response.data);
    setPageCount(response.pageCount);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>All Users : {usersData.length}</h2>
      {isLoading ? (
        <div
          style={{
            width: "50%",
            margin: "auto",
            height: 200,
            display: "flex",
            justifyContent: "center",
            marginTop: 200,
          }}>
          <Spinner size={40} color="#000" />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#f3e5f5" }}>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Last activity</TableCell>
                <TableCell>IsSeller</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((row) => (
                <TableRow key={row.name} hover>
                  <TableCell align="left">{row.first_name}</TableCell>
                  <TableCell align="left">{row.last_name}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.last_activity}</TableCell>
                  <TableCell align="left" style={{ backgroundColor: "green" }}>
                    {row.shop_setup == "complete" ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "50%",
          textAlign: "center",
          justifyContent: "center",
          marginTop:30
        }}>
          
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            defaultPage={page}
            size="large"
            onChange={handlePagination}
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
