import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/user";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    console.log("logout com");
    navigate("/");
    // eslint-disable-next-line
  }, []);
  return null;
};

export default Logout;
