import React, { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import api from "../adapters/adapter";
import { authContext } from "./auth-context";
import { decodeToken } from "../utils/token-helper";
import { setHeader } from "../adapters/xhr";
import VerifyDialog from "../components/VerifyDialog";
import { setUser } from "../redux/slices/user";

const AuthContext = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState();
  const [birthdayDate, setBirthdayDate] = useState("");
  const [gender, setGender] = useState("مرد");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const location = useLocation();
  const background = location.state && location.state.background;

  const Baselocation = {
    pathname: "/",
  };

  const handleSignUp = async () => {
    try {
      const { status, data } = await api.signup({
        fullName,
        email,
        birthdayDate,
        gender,
        password,
      });
      if (status === 201) {
        toast.success(data.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
        setUserId(data.userId);
        setShowVerifyModal(true);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      const { status, data } = await api.resend({ userId: userId });
      if (status === 200) {
        toast.success(data.message, {
          position: "bottom-center",
          closeOnClick: true,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleVerify = async (verificationCode) => {
    try {
      // dispatch(setLoading({ status: true }));
      const { status } = await api.verify(verificationCode);
      if (status === 200) {
        // dispatch(setLoading({ status: false }));
        toast.success("اکانت شما با موفقیت فعال شد", {
          position: "bottom-center",
          closeOnClick: true,
        });
        setShowVerifyModal(false);
        navigate("/login");
      }
    } catch (error) {
      // dispatch(setLoading({ status: false }));
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleLogin = async (user) => {
    try {
      // dispatch(setLoading({ status: true }));
      const { data, status } = await api.login(user);
      if (status === 200) {
        setHeader(data.token);
        localStorage.setItem("token", data.token);
        console.log(decodeToken(data.token).user);
        dispatch(setUser(decodeToken(data.token).user));
        // dispatch(setLoading({ status: false }));
        if (decodeToken(data.token).user?.isAdmin) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      // dispatch(setLoading({ status: false }));
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleChangePassword = async (inputData) => {
    try {
      // dispatch(setLoading({ status: true }));
      inputData.personalCode = user.personalCode;
      const { status } = await api.changePassword(inputData);
      if (status === 200) {
        // dispatch(setLoading({ status: false }));
        toast.success("رمز عبور شما با موفقیت تغییر یافت", {
          position: "bottom-center",
          closeOnClick: true,
        });
        navigate(background.pathname);
      }
    } catch (error) {
      // dispatch(setLoading({ status: false }));
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  const handleForgetPassword = async (user) => {
    try {
      // dispatch(setLoading({ status: true }));
      const { status } = await api.forgetPassword(user);
      if (status === 200) {
        // dispatch(setLoading({ status: false }));
        toast.success("رمز عبور جدید برای شما پیامک شد", {
          position: "bottom-center",
          closeOnClick: true,
        });
        navigate("/", { state: { background: Baselocation } });
      }
    } catch (error) {
      // dispatch(setLoading({ status: false }));
      toast.error(error.response.data.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        fullName,
        setFullName,
        email,
        setEmail,
        birthdayDate,
        setBirthdayDate,
        gender,
        setGender,
        password,
        setPassword,
        handleSignUp,
        handleVerify,
        handleLogin,
        handleChangePassword,
        handleForgetPassword,
        handleResendVerificationCode,
      }}
    >
      <VerifyDialog
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
      />
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
