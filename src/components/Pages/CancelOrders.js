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

const CancelOrders = () => {
  const classes = useStyles();
  const admin = useSelector((state) => state.auth.admin);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const fetchCancelOrderData = async () => {
      const response = await actions.fetchCancelOrderData(page);
      setData(response.data);
      setPageCount(response.pageCount);
    };
    fetchCancelOrderData();
  }, []);

  const searchCancelOrder = async () => {
    if (orderId !== "") {
      try {
        setIsLoading(true);
        const response = await actions.searchCancelOrder(orderId);
        //dispatch order
        setIsLoading(false);
        if (response.data.length === 0) {
          alert("No Order Found");
          return;
        } else {
          setData(response.data);
          setPageCount(response.pageCount);
        }
      } catch (e) {
        alert("Internal server error input not valid, value must be hex code");
      }
    }
  };

  const adminCancelOrder = async (user_name, cart_id, amount_to_return) => {
    const r = window.confirm("Cancel Order for " + user_name);
    if (r) {
      try {
        setIsLoading(true);
        const response = await actions.adminCancelOrder(
          cart_id,
          amount_to_return
        );
        //dispatch order
        setIsLoading(false);
        if (!response.status) {
          setIsLoading(false);
          alert("Error cancelling this order.");
          window.location.reload();
          return;
        }
        window.location.reload();
      } catch (e) {
        setIsLoading(false);
        alert("Error cancelling this order.");
        window.location.reload();
      }
    }
  };

  const displayVariants = (selected_variant_value) => {
    return selected_variant_value.map((result, index, array) => {
      return (
        <div
          style={{
            padding: 5,
            backgroundColor: "#eeeeee",
            marginTop: 5,
            borderRadius: 20,
            marginLeft: 10,
            marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          key={index}>
          <p>
            {result.name}: {result.content} (+${result.price})
          </p>
        </div>
      );
    });
  };

  const renderProducts = (items, cart_id) => {
    return items.map((result, index) => {
      return (
        <div style={styles.itemsCard} key={index}>
          <div
            style={{ overflow: "auto", overflowY: "hidden", display: "flex" }}>
            {displayVariants(result.selected_variant_value)}
          </div>
          <div
            style={{
              padding: 10,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              borderBottomColor: "#9e9e9e",
              borderBottomWidth: 0.5,
            }}>
            <div
              style={{ width: "80%", flexDirection: "row", display: "flex" }}>
              <div style={{ width: "30%" }}>
                <img
                  src={result.product.main_image}
                  style={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                  }}
                />
              </div>
              <div style={{ width: "70%", marginLeft: 5 }}>
                <p style={{ fontSize: 16 }}>{result.product.product_name}</p>
                <div
                  style={{
                    padding: 5,
                    backgroundColor: "#eeeeee",
                    marginTop: 5,
                    borderRadius: 20,
                    width: 155,
                  }}>
                  <p style={{}}>Qty bought : {result.qty}</p>
                </div>
              </div>
            </div>
            <div style={{ width: "20%", alignSelf: "flex-end" }}>
              <p
                style={{
                  fontSize: 18,
                  alignSelf: "flex-end",
                }}>
                ${parseFloat(result.price).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderItem = data.map((item, index) => {
    return (
      <div
        style={{
          marginBottom: 15,
          padding: 10,
          backgroundColor: "#fff",
          marginTop: 5,
          paddingBottom: 20,
          boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
        }}
        key={index}>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}>
          <div>
            <p style={{ fontSize: 20 }}>Bought by</p>
            <p style={{ fontSize: 16 }}>
              {item.user.first_name + " " + item.user.last_name}
            </p>
            <p style={{ fontSize: 20, marginTop: 20 }}>Sold by</p>
            <p style={{ fontSize: 16 }}>
              {item.seller.first_name + " " + item.seller.last_name}
            </p>
            <p style={{ fontSize: 15, marginTop: 20 }}>OrderID - {item._id}</p>
          </div>
        </div>

        <p
          style={{
            fontSize: 15,
            marginBottom: 10,
          }}>
          Date Shipped: Not Shipped
        </p>
        <p
          style={{
            fontSize: 15,
            marginBottom: 10,
          }}>
          Tracking number: No number to provide
        </p>
        <p style={{ color: "red" }}>
          Before you cancel an order, make sure you contact the seller to let
          the seller know their order is about to be cancelled due to late or
          delayed shipping
        </p>
        {renderProducts(item.items, item._id)}

        <div
          style={{
            borderTopWidth: 0.4,
            marginTop: 15,
            borderTopColor: "#9e9e9e",
          }}>
          <p
            style={{
              fontSize: 18,
              marginTop: 10,
            }}>
            Order Details
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}>
            <p
              style={{
                fontSize: 15,
                marginTop: 10,
              }}>
              Shipping total (estimated from usps)
            </p>
            <p
              style={{
                fontSize: 15,
                marginTop: 10,
              }}>
              ${item.shippment_price}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}>
            <p
              style={{
                fontSize: 15,
                marginTop: 10,
              }}>
              Processing fee
            </p>
            <p
              style={{
                fontSize: 15,
                marginTop: 10,
              }}>
              ${item.processing_fee}
            </p>
          </div>

          {item.discount_applied != "0.00" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}>
              <p
                style={{
                  fontSize: 15,
                  marginTop: 10,
                }}>
                Discount
              </p>
              <p
                style={{
                  fontSize: 15,
                  marginTop: 10,
                }}>
                -${item.discount_applied}
              </p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}>
            <p
              style={{
                fontSize: 15,
                marginTop: 10,
              }}>
              Shaloz takes
            </p>
            <p
              style={{
                fontSize: 15,
                marginTop: 10,
              }}>
              ${item.theshop_takes}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}>
            <p
              style={{
                fontSize: 15,
                marginTop: 10,
              }}>
              Tax
            </p>
            <p
              style={{
                fontSize: 15,
                marginTop: 10,
              }}>
              ${item.tax}
            </p>
          </div>

          <div style={{ borderTopWidth: 0.5, borderTopColor: "#9e9e9e" }}>
            <p
              style={{
                fontSize: 17,
                marginTop: 10,
              }}>
              Shipping details
            </p>
            <p
              style={{
                fontSize: 20,
                marginTop: 10,
              }}>
              {item.shipping_details}, United States
            </p>
          </div>
          <div
            style={{
              borderTopWidth: 0.4,
              marginTop: 15,
              borderTopColor: "#9e9e9e",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <p
              style={{
                fontSize: 20,
                marginTop: 10,
              }}>
              Order total ({item.items.length} item(s)):
            </p>
            <p
              style={{
                fontSize: 18,
                marginTop: 10,
              }}>
              ${parseFloat(item.total).toFixed(2)}
            </p>
          </div>
          <div
            onClick={adminCancelOrder.bind(
              this,
              item.user.first_name + " " + item.user.last_name,
              item._id,
              (
                parseFloat(item.total) -
                parseFloat(item.processing_fee) -
                parseFloat(item.tax)
              ).toFixed(2)
            )}>
            <div
              style={{
                width: "50%",
                margin: "auto",
                padding: 10,
                backgroundColor: "red",
                marginTop: 50,
                borderRadius: 5,
                cursor: "pointer",
              }}>
              <p
                style={{
                  fontSize: 18,
                  color: "#fff",
                  textAlign: "center",
                }}>
                Cancel Order, Return
                {item.user.first_name + " " + item.user.last_name} $
                {(
                  parseFloat(item.total) -
                  parseFloat(item.processing_fee) -
                  parseFloat(item.tax)
                ).toFixed(2)}
              </p>
            </div>
          </div>
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
          }}>
          No data to show
        </p>
      </div>
    );
  } else {
    view = renderItem;
  }

  return (
    <div style={{ padding: 20 }}>
      <div>
        <h1 style={{ textAlign: "center" }}>CANCEL ORDERS</h1>
        <input
          type="p"
          style={{ width: "20%" }}
          placeholder="Search by Order Id number"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={searchCancelOrder}>Search</button>
      </div>
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
        <div style={{ marginTop: 30 }}>{view}</div>
      )}
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

export default CancelOrders;
