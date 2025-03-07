import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginApiCall } from "../../store/services/Auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./forgetPassword";
import FullScreenLoader from "../../ReusableComp/FullScreenLoader";

interface SignInProps {
  onSwitch?: () => void;
  onClose?: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSwitch, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const Navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      loginApiCall({
        body: {
          email: values.email,
          password: values.password,
        },
      })
        .then((res: any) => {
          toast.success(res.msg);
          localStorage.setItem("accessToken", res.token.access);
          if (onClose) {
            onClose();
          }
          Navigate("/");
        })
        ?.catch((err: any) => {
          console.log("Error Response:", err);
          toast.error(err.data?.error?.non_field_errors);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <>
      {" "}
      {loading && <FullScreenLoader />}
      <form className="login-content" onSubmit={formik.handleSubmit}>
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email Address"
          className={`login-input ${
            formik.touched.email && formik.errors.email ? "input-error" : ""
          }`}
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}

        {/* Password Input with Show/Hide Icon */}
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`login-input ${
              formik.touched.password && formik.errors.password
                ? "input-error"
                : ""
            }`}
            {...formik.getFieldProps("password")}
          />
          <span className="icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}

        <a
          href="#"
          className="forgot-password"
          onClick={() => setForgotPasswordOpen(true)}
        >
          Forgot your password?
        </a>
        <button type="submit" className="login-btn">
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="register-link">
          New to DealSmart? <a onClick={onSwitch}>Register</a>
        </p>
      </form>
      {/* Forgot Password Popup */}
      {isForgotPasswordOpen && (
        <ForgotPassword forgetonClose={() => setForgotPasswordOpen(false)} />
      )}
    </>
  );
};

export default SignIn;
