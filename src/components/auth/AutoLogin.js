import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokenFromLocalStorage } from "../../store/authSlice";

const AutoLogin = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTokenFromLocalStorage());
  }, []);

  return props.children;
};

export default AutoLogin;
