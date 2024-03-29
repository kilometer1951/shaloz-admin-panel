import { URL } from "./types";

export const loginUser = async (email, password, callback) => {
  const response = await fetch(`${URL}/api/auth/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const resData = await response.json();
  callback(resData);
};

export const fetchUsers = async (page) => {
  const response = await fetch(`${URL}/api/admin/all_users?page=${page}`);
  const resData = await response.json();
  return resData;
};

export const fetchBuyers = async (page) => {
  const response = await fetch(`${URL}/api/admin/buyers?page=${page}`);
  const resData = await response.json();
  return resData;
};

export const fetchSellers = async (page) => {
  const response = await fetch(`${URL}/api/admin/sellers?page=${page}`);
  const resData = await response.json();
  return resData;
};

export const fetchPaySellerData = async (page) => {
  const response = await fetch(`${URL}/api/admin/pay_seller?page=${page}`);
  const resData = await response.json();
  return resData;
};

export const fetchCancelOrderData = async (page) => {
  const response = await fetch(
    `${URL}/api/admin/fetch_orders_to_cancel?page=${page}`
  );
  const resData = await response.json();
  return resData;
};

export const adminPaySeller = async (cart_id, amount_to_pay) => {
  const response = await fetch(`${URL}/api/add/pay_seller`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart_id,
      amount_to_pay,
    }),
  });
  const resData = await response.json();
  return resData;
};

export const adminPaySellerWithPoints = async (cart_id, amount_to_pay) => {
  const response = await fetch(
    `${URL}/api/add/pay_seller_with_points_redeemed`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart_id,
        amount_to_pay,
      }),
    }
  );
  const resData = await response.json();
  return resData;
};

export const adminCancelOrder = async (cart_id, amount_to_return) => {
  const response = await fetch(`${URL}/api/admin/cancel_order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart_id,
      amount_to_return,
    }),
  });
  const resData = await response.json();
  return resData;
};

export const fetchProductToApprove = async (page) => {
  const response = await fetch(
    `${URL}/api/admin/fetch_products_to_approve/?page=${page}`
  );
  const resData = await response.json();
  return resData;
};

export const approveProduct = async (product_id) => {
  const response = await fetch(`${URL}/api/admin/approve_product/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id,
    }),
  });
  return;
};

export const paymentVerificationMessage = async (seller_id) => {
  const response = await fetch(
    `${URL}/api/admin/payment_verification_message/${seller_id}`
  );
  const resData = await response.json();
  return resData;
};

export const searchOrder = async (orderId) => {
  const response = await fetch(`${URL}/api/admin/search_by_orderId/${orderId}`);
  const resData = await response.json();
  return resData;
};

export const searchCancelOrder = async (orderId) => {
  const response = await fetch(
    `${URL}/api/admin/search_by_orderId_cancel/${orderId}`
  );
  const resData = await response.json();
  return resData;
};

export const checkPlatformBalance = async () => {
  const response = await fetch(`${URL}/api/admin/check_platform_balance`);
  const resData = await response.json();
  return resData;
};
