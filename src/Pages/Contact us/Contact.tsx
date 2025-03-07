import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../ReusableComp/Header";
import Footer from "../../ReusableComp/footer";
import "./contact-us.css";
import conactImage from "../../assets/contact-main-img.png";
import { IoCallOutline } from "react-icons/io5";
import { CiShop, CiDeliveryTruck } from "react-icons/ci";
import { GiScrew } from "react-icons/gi";
import { contactUsForm } from "../../store/services/Auth";
import toast from "react-hot-toast";

const Contact = () => {
  const [contactUs, setContactUs]: any = useState();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      queryType: "",
      email: "",
      mobilePrefix: "",
      mobile: "",
      comment: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      queryType: Yup.string().required("Please enter topic of your query"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]+$/, "Must be a valid number")
        .required("Mobile No. is required"),
      comment: Yup.string().required("Please enter your queries"),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      contactUsForm({
        body: {
          full_name: values.fullName,
          subject: values.queryType,
          email: values.email,
          phone: values.mobile,
          message: values.comment,
          country_code: values.mobilePrefix,
        },
      })
        .then((res: any) => {
          setContactUs(res);
          toast.success("Your form has been submitted successfully!");
          formik.resetForm();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong. Please try again later.");
        });
    },
  });
  return (
    <div>
      <Header />
      <div className="container">
        <div className="contact-main-img">
          <img src={conactImage} alt="Contact" />
        </div>
        <div className="flex space-bw container">
          <div className="col-30">
            <div className="we-help">We’re here to help</div>
            <div className="flex align-center space-bw contact-icons">
              <div className="col-50 text-center">
                <IoCallOutline className="white" size={25} />
                <p>Call US</p>
                <a>800 958 6254</a>
              </div>
              <div className="col-50 text-center">
                <CiShop className="white" size={25} />
                <p>Visit Us</p>
                <a>Find a Store</a>
              </div>
              <div className="col-50 text-center">
                <CiDeliveryTruck className="white" size={25} />
                <p>Delivery Options</p>
                <a>Learn more</a>
              </div>
              <div className="col-50 text-center">
                <GiScrew className="white" size={25} />
                <p>Service & Warranty</p>
                <a>Learn More</a>
              </div>
            </div>
          </div>
          <div className="col-70 contact-form-top">
            <h3 className="contact-form">Contact Form</h3>
            <p className="contact-form-para">
              We are always happy to help here at Jumbo. Drop us a line using
              the form below for all your queries.
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="col-60 full-name-head">
                <div className="full-name">Full Name</div>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  {...formik.getFieldProps("fullName")}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="error">{formik.errors.fullName}</div>
                )}
              </div>
              <div className="col-60 full-name-head">
                <div className="full-name">What can we help you with?</div>
                <input
                  type="text"
                  placeholder="General"
                  {...formik.getFieldProps("queryType")}
                />
                {formik.touched.queryType && formik.errors.queryType && (
                  <div className="error">{formik.errors.queryType}</div>
                )}
              </div>
              <div className="col-60 full-name-head">
                <div className="full-name">Email</div>
                <input
                  type="email"
                  placeholder="Enter Email Here"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>
              <div className="col-60 full-name-head">
                <div className="full-name">Mobile No.</div>
                <div className="flex align-center space-bw mobile-head">
                  <div className="col-20">
                    <input
                      type="text"
                      placeholder="+971"
                      {...formik.getFieldProps("mobilePrefix")}
                    />
                  </div>
                  <div className="col-80">
                    <input
                      type="text"
                      placeholder="Enter Mobile No. Here"
                      {...formik.getFieldProps("mobile")}
                    />
                  </div>
                </div>
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="error">{formik.errors.mobile}</div>
                )}
              </div>
              <div className="col-60 full-name-head">
                <div className="full-name">Write your queries</div>
                <textarea
                  placeholder="Enter Comments Here"
                  {...formik.getFieldProps("comment")}
                ></textarea>
                {formik.touched.comment && formik.errors.comment && (
                  <div className="error">{formik.errors.comment}</div>
                )}
              </div>
              <button className="contact-submit col-20" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
