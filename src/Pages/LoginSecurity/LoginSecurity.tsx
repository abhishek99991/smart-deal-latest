import React from "react";
import "./loginsecurity.css";
import Header from "../../ReusableComp/Header";
import Footer from "../../ReusableComp/footer";
import { getUserDetails } from "../../store/services/Auth";
import { useState, useEffect } from "react";
import emailOtpImg from "../../assets/email-otp.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateProfile } from "../../store/services/Auth";
import toast from "react-hot-toast";
import { updatePassword } from "../../store/services/Auth";

const LoginSecurity = () => {
  const [userData, setUserData]: any = useState(null);
  const [isNameOpen, setIsNameOpen] = useState(false);
  const [isPhnoneOpen, setIsPhnoneOpen] = useState(false);
  const [isPwdEditOpen, setIsPwdEditOpen] = useState(false);

  useEffect(() => {
    getUserDetails()
      .then((res: any) => {
        setUserData(res);
      })
      .catch((err) => console.log("Error fetching user details:", err));
  }, []);

  const updateName = () => {
    getUserDetails().then((res: any) => {
      setUserData(res);
    });
  };

  const handleEditClick = () => {
    setIsNameOpen(true);
  };
  const handlePhnEdit = () => {
    setIsPhnoneOpen(true);
  };
  const passwordEditPop = () => {
    setIsPwdEditOpen(true);
  };

  const handleClose = () => {
    setIsNameOpen(false);
    setIsPhnoneOpen(false);
    setIsPwdEditOpen(false);
  };

  const nameFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
    }),

    onSubmit: async (values) => {
      const response: any = await updateProfile({
        body: {
          to_update: "name",
          new_first_name: values?.firstName,
          new_last_name: values?.lastName,
        },
      })
        .then((res: any) => {
          toast.success(res?.msg);
          setIsNameOpen(false);
          updateName();
          console.log("res", res);
        })
        .catch((err: any) => {
          toast.error(err?.data?.error);
        });
      console.log("Profile updated successfully:", response.data);
    },
  });

  const phoneFormik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .required("Phone Number is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
    }),
    onSubmit: async (values) => {
      const response: any = await updateProfile({
        body: {
          to_update: "phone",
          new_phone: values?.phoneNumber,
        },
      })
        .then((res: any) => {
          toast.success(res?.msg);
          setIsPhnoneOpen(false);
          updateName();
          console.log("res", res);
        })
        .catch((err: any) => {
          toast.error(err?.data?.error);
        });
      console.log("Profile updated successfully:", response.data);
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current Password is required"),
      newPassword: Yup.string()
        .required("New Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmNewPassword: Yup.string()
        .required("Confirm New Password is required")
        .oneOf(
          [Yup.ref("newPassword")],
          "New Password and Confirm Password must match"
        ),
    }),
    onSubmit: async (values) => {
      const response: any = await updatePassword({
        body: {
          curr_password: values?.currentPassword,
          new_password1: values?.newPassword,
          new_password2: values?.confirmNewPassword,
        },
      })
        .then((res: any) => {
          toast.success(res?.msg);
          setIsPwdEditOpen(false);
          updateName();
        })
        .catch((err: any) => {
          toast.error(err?.data?.error?.non_field_errors[0]);
        });
      console.log("Profile updated successfully:", response.data);
    },
  });

  return (
    <div>
      <Header />
      <div className="container login-security-cont">
        <h2 className="login-heading">Login & Security</h2>
        <div className="login-security-top">
          <div className="flex align-center space-bw login-name-section">
            <div className="name-section">
              <div>Email</div>
              <p>{userData ? userData.email : "Loading..."}</p>
            </div>
            {/* <div className='edit-button'><button>Edit</button></div> */}
          </div>
          <div className="flex align-center space-bw login-name-section">
            <div className="name-section">
              <div>Name</div>
              <p>
                {userData
                  ? `${userData.first_name} ${userData.last_name}`
                  : "Loading..."}
              </p>
            </div>
            <div className="edit-button" onClick={handleEditClick}>
              <button>Edit</button>
            </div>
          </div>
          <div className="flex align-center space-bw login-name-section">
            <div className="name-section">
              <div>Phone Number</div>
              <p>{userData ? userData.phone : "Loading..."}</p>
            </div>
            <div className="edit-button" onClick={handlePhnEdit}>
              <button>Edit</button>
            </div>
          </div>
          <div className="flex align-center space-bw login-name-section">
            <div className="name-section">
              <div>Password</div>
              <p>***************</p>
            </div>
            <div className="edit-button" onClick={passwordEditPop}>
              <button>Edit</button>
            </div>
          </div>
        </div>
      </div>

      {isNameOpen && (
        <div className="name-modal-overlay">
          <div className="name-modal-content">
            <div className="name-close-btn" onClick={handleClose}>
              x
            </div>
            <div className="name-update-img">
              <img src={emailOtpImg} alt="" />
            </div>
            <h3 className="name-update">Name Update</h3>
            <form onSubmit={nameFormik.handleSubmit}>
              <div className="name-popup-input">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First name"
                  onChange={nameFormik.handleChange}
                  onBlur={nameFormik.handleBlur}
                  value={nameFormik.values.firstName}
                />
                {nameFormik.touched.firstName && nameFormik.errors.firstName ? (
                  <div className="error">{nameFormik.errors.firstName}</div>
                ) : null}
              </div>

              <div className="name-popup-input">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last name"
                  onChange={nameFormik.handleChange}
                  onBlur={nameFormik.handleBlur}
                  value={nameFormik.values.lastName}
                />
                {nameFormik.touched.lastName && nameFormik.errors.lastName ? (
                  <div className="error">{nameFormik.errors.lastName}</div>
                ) : null}
              </div>
              <div className="name-popup-update">
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPhnoneOpen && (
        <div className="name-modal-overlay">
          <div className="name-modal-content">
            <div className="name-close-btn" onClick={handleClose}>
              x
            </div>
            <div className="name-update-img">
              <img src={emailOtpImg} alt="" />
            </div>
            <h3 className="name-update">Phone Update</h3>
            <form onSubmit={phoneFormik.handleSubmit}>
              <div className="name-popup-input">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter new no."
                  onChange={phoneFormik.handleChange}
                  onBlur={phoneFormik.handleBlur}
                  value={phoneFormik.values.phoneNumber}
                />
                {phoneFormik.touched.phoneNumber &&
                phoneFormik.errors.phoneNumber ? (
                  <div className="error">{phoneFormik.errors.phoneNumber}</div>
                ) : null}
              </div>
              <div className="name-popup-update">
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPwdEditOpen && (
        <div className="name-modal-overlay">
          <div className="name-modal-content">
            <div className="name-close-btn" onClick={handleClose}>
              x
            </div>
            {/* <div className='name-update-img'><img src={emailOtpImg} alt="" /></div> */}
            <h3 className="password-update-popup">Password Update</h3>
            <form onSubmit={passwordFormik.handleSubmit}>
              <div className="name-popup-input">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password."
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.currentPassword}
                />
                {passwordFormik.touched.currentPassword &&
                passwordFormik.errors.currentPassword ? (
                  <div className="error">
                    {passwordFormik.errors.currentPassword}
                  </div>
                ) : null}
              </div>
              <div className="name-popup-input">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.newPassword}
                />
                {passwordFormik.touched.newPassword &&
                passwordFormik.errors.newPassword ? (
                  <div className="error">
                    {passwordFormik.errors.newPassword}
                  </div>
                ) : null}
              </div>
              <div className="name-popup-input">
                <input
                  type="password"
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  value={passwordFormik.values.confirmNewPassword}
                />
                {passwordFormik.touched.confirmNewPassword &&
                passwordFormik.errors.confirmNewPassword ? (
                  <div className="error">
                    {passwordFormik.errors.confirmNewPassword}
                  </div>
                ) : null}
              </div>
              <div className="name-popup-update">
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LoginSecurity;
