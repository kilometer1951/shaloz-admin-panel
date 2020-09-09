import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import jwtDecode from "jwt-decode";
import App from "./App";
import RequireAuth from "components/require_auth";

import Auth from "./components/Pages/Auth";
import AllUsers from "./components/Pages/AllUsers";
import Buyers from "./components/Pages/Buyers";
import Sellers from "./components/Pages/Sellers";
import PaySellers from "./components/Pages/PaySellers";
import CancelOrders from "./components/Pages/CancelOrders";
import WebsiteMessages from "./components/Pages/WebsiteMessages";
import AllProducts from "./components/Pages/AllProducts";
import ApproveProducts from "./components/Pages/ApproveProducts";

const store = createStore(
  reducers,
  {
    auth: {
      admin: localStorage.getItem("token")
        ? jwtDecode(localStorage.getItem("token")).sub
        : {},
    },
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" component={RequireAuth(Auth, "authPage")} exact />
        <Route
          path="/admin/all_users"
          component={RequireAuth(AllUsers, "otherPages")}
        />
        <Route
          path="/admin/buyers"
          component={RequireAuth(Buyers, "otherPages")}
        />
        <Route
          path="/admin/sellers"
          component={RequireAuth(Sellers, "otherPages")}
        />
        <Route
          path="/admin/pay_sellers"
          component={RequireAuth(PaySellers, "otherPages")}
        />
        <Route
          path="/admin/cancel_orders"
          component={RequireAuth(CancelOrders, "otherPages")}
        />
        <Route
          path="/admin/website_messages"
          component={RequireAuth(WebsiteMessages, "otherPages")}
        />
        <Route
          path="/admin/all_products"
          component={RequireAuth(AllProducts, "otherPages")}
        />
        <Route
          path="/admin/approve_product"
          component={RequireAuth(ApproveProducts, "otherPages")}
        />
      </App>
    </BrowserRouter>
  </Provider>,

  document.querySelector("#root")
);
