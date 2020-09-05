import React, { useState ,useEffect } from "react";
import "styles/login.css";
import { TextField } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import * as actions from "actions";
import Button from "@material-ui/core/Button";

const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const Auth = (props) => {
  const admin = useSelector((state) => state.auth.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);



  const submitForm = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Invalid email");
      return;
    } else if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }

    if (password === "") {
      alert("Invalid password");
      return;
    }

    setLoading(true);
    await actions.loginUser(email, password, async (resData) => {
      if (!resData.status) {
        alert("Invalid email or password");
        return;
      }
      //user found save to local storage and dispatch user
      //store
      localStorage.setItem("token", resData.token);
      //dispatch
      window.location.href = "/admin/all_users"
     // props.history.push("/admin/all_users")
      //let decode_token = jwtDecode(resData.token)
      // await dispatch(actions.dispatchUser(resData.user))
    });
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <p
        style={{
          fontFamily: "poppins_regular",
          textAlign: "center",
          fontSize: 30,
        }}>
        Shaloz Control Panel
      </p>

      <form autoComplete="off" noValidate style={{ marginTop: 20 }}>
        <div style={{ margin: "auto", width: "50%" }}>
          <div style={{ marginBottom: 20 }}>
            <TextField
              type="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ width: "100%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              style={{ width: "100%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", marginTop: 20 }}
            onClick={submitForm} disabled={isLoading ? true : false}>
              {isLoading ? <CircularProgress color="inherit" thickness={3} size={30} /> : "Login"}
            
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
