import React, { useEffect,useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const RequireAuth = (ComposedComponent, authPage) => {
  const Authentication = (props) => {
  const admin = useSelector((state) => state.auth.admin);


 const router = props.history

    useLayoutEffect(() => {
      const checkAuth = () => {
        if (authPage === "authPage") {
          if (Object.entries(admin).length !== 0) {
            router.push("/admin/all_users")
          }
        } else {
          if (Object.entries(admin).length === 0) {
            router.push("/")
          }
        }
      };
      checkAuth();
    }, []);

    return <ComposedComponent {...props} />;
  };
  return Authentication;
};

export default RequireAuth;
