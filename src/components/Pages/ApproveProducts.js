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
import Moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ApproveProducts = () => {
  const classes = useStyles();
  const admin = useSelector((state) => state.auth.admin);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const fetchProductToApprove = async () => {
      setIsLoading(true);
      const response = await actions.fetchProductToApprove(page);
      setIsLoading(false);
      setData(response.data);
      setPageCount(response.pageCount);
    };
    fetchProductToApprove();
  }, []);

  const approveProduct = async (product_id) => {
    try {
      setIsApproving(true);
      const response = await actions.approveProduct(product_id);
      const filter = data.filter((value) => value._id != product_id);
      setData(filter);
      setIsApproving(false);
    } catch (e) {
      alert("Error approving this product.");
      return;
    }
  };

  const handlePagination = async (event, page_number) => {
    setPage(page_number);
    setIsLoading(true);
    const response = await actions.fetchProductToApprove(page_number);
    setIsLoading(false);
    setData(response.data);
    setPageCount(response.pageCount);
  };

  const renderProducts = data.map((result, index) => {
    return (
      <div style={styles.itemsCard} key={index}>
        <div style={{ width: "100%" }}>
          <img
            src={result.main_image}
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ marginLeft: 5 }}>
          <p>
            Seller Name: {result.user.first_name + " " + result.user.last_name}
          </p>
          <br />
          <p>Shop Name: {result.user.shop_name}</p>
          <br />
          <p>{result.product_name}</p>
          <br />
          <p>Price: {result.product_price}</p>
        </div>

        <div
          style={{
            width: "50%",
            margin: "auto",
            padding: 10,
            backgroundColor: "green",
            marginTop: 50,
            borderRadius: 5,
            cursor: "pointer",
            marginBottom: 10,
          }}
          onClick={!isApproving && approveProduct.bind(this, result._id)}
        >
          <p
            style={{
              fontSize: 18,
              color: "#fff",
              textAlign: "center",
            }}
          >
            {isApproving ? (
              <Spinner size={20} color="#000" />
            ) : (
              " Approve product"
            )}
          </p>
        </div>
      </div>
    );
  });

  let view;
  if (data.length === 0) {
    view = (
      <div style={{ textAlign: "center", marginTop: "10%", padding: 25 }}>
        <p
          style={{
            fontSize: 20,
            pAlign: "center",
            padding: 20,
          }}
        >
          No data to show still working on feature
        </p>
      </div>
    );
  } else {
    view = renderProducts;
  }

  return (
    <div style={{ padding: 20 }}>
      {isLoading ? (
        <div
          style={{
            width: "50%",
            margin: "auto",
            height: 200,
            display: "flex",
            justifyContent: "center",
            marginTop: 200,
          }}
        >
          <Spinner size={40} color="#000" />
        </div>
      ) : (
        <div
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {view}
        </div>
      )}
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "50%",
          textAlign: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
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

const styles = {
  itemsCard: {
    borderRadius: 5,
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    marginRight: 1,
    marginBottom: 5,
    marginTop: 5,
    width: "15%",
    marginRight: 10,
  },
  header: {
    width: "100%",
    height: "11%",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
  },
};

export default ApproveProducts;
