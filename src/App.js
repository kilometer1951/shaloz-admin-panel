import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-activity/dist/react-activity.css";

export default ({ children }, props) => {
  const admin = useSelector((state) => state.auth.admin);

  return (
    <div>
      {Object.entries(admin).length !== 0 && (
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <ul>
              <a href="/admin/all_users" style={{ marginRight: 20 }}>
                All Users
              </a>
              <a href="/admin/buyers" style={{ marginRight: 20 }}>
                Buyers
              </a>
              <a href="/admin/sellers" style={{ marginRight: 20 }}>
                Sellers
              </a>
              <a href="/admin/pay_sellers" style={{ marginRight: 20 }}>
                Pay Sellers
              </a>
              <a href="/admin/cancel_orders" style={{ marginRight: 20 }}>
                Cancel Orders
              </a>
              <a href="/admin/website_messages" style={{ marginRight: 20 }}>
                Website Messages
              </a>
              <a href="/admin/all_products" style={{ marginRight: 20 }}>
                All Products
              </a>
              <a href="/admin/approve_product" style={{ marginRight: 20 }}>
                Approve products
              </a>
            </ul>
          </div>
          <div>
            <span style={{ marginRight: 20 }}>Welcome {admin.first_name}</span>
            <a
              style={{ marginRight: 20 }}
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Log out
            </a>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
