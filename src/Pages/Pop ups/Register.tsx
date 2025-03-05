import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../store/services/Auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAtom } from "jotai";
import { UserEmail } from "../../../Jotai";
import toast from "react-hot-toast"; // Import toast

interface RegisterProps {
  onSwitch: () => void;
  onRegister: () => void;
  onClose?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitch, onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [finalEmail, setFinalEmail]: any = useAtom(UserEmail);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      gender: Yup.string().required("Select a gender"),
      dob: Yup.date().required("Required"),
      phone: Yup.string().min(10, "Invalid phone number").required("Required"),
      address: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await registerUser({
          body: {
            email: values.email,
            first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone,
            dob: values.dob,
            address: values.address, 
            password: values.password, 
            password2: values.confirmPassword,
            gender: values.gender,
          },
        })
        .then((res:any)=>{
          toast.success(res.msg);
          onRegister()
          setFinalEmail(values.email)
        })
      } catch (err: any) {
        console.log("Error Response:", err);
  
        // Extract errors from response
       toast.error(err.data?.error?.email?.[0])
      }
    },
  });
  
 
  return (
    <>
      <form className="login-content" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="first_Name"
          placeholder="First Name"
          className={`login-input ${
            formik.touched.firstName && formik.errors.firstName ? "input-error" : ""
          }`}
          {...formik.getFieldProps("firstName")}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <p className="error">{formik.errors.firstName}</p>
        )}

        <input
          type="text"
          id="last_Name"
          placeholder="Last Name"
          className="login-input"
          {...formik.getFieldProps("lastName")}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <p className="error">{formik.errors.lastName}</p>
        )}

        <div className="flex align-center register-male-head">
          <div className="register-male">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              onChange={formik.handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="register-male">
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              onChange={formik.handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        {formik.touched.gender && formik.errors.gender && (
          <p className="error">{formik.errors.gender}</p>
        )}

        <input
          type="date"
          id="dob"
          placeholder="DOB"
          className="login-input register-date"
          {...formik.getFieldProps("dob")}
        />
        {formik.touched.dob && formik.errors.dob && (
          <p className="error">{formik.errors.dob}</p>
        )}

        <input
          type="text"
          id="phone"
          placeholder="Phone Number"
          className="login-input"
          {...formik.getFieldProps("phone")}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="error">{formik.errors.phone}</p>
        )}

        <input
          type="text"
          id="address"
          placeholder="Address"
          className="login-input"
          {...formik.getFieldProps("address")}
        />
        {formik.touched.address && formik.errors.address && (
          <p className="error">{formik.errors.address}</p>
        )}

        <input
          type="text"
          id="email"
          placeholder="Email Address"
          className="login-input"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}

        {/* Password Field */}
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Create Password"
            className="login-input"
            {...formik.getFieldProps("password")}
          />
          <span className="icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}

        {/* Confirm Password Field */}
        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm Password"
            className="login-input"
            {...formik.getFieldProps("confirmPassword")}
          />
          <span
            className="icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="error">{formik.errors.confirmPassword}</p>
        )}

        <button type="submit" id="submit" className="login-btn">
          Register
        </button>
        <p className="register-link" id="registerLink">
          Already have an account? <a onClick={onSwitch}>Sign In</a>
        </p>
      </form>
    </>
  );
};

export default Register;
