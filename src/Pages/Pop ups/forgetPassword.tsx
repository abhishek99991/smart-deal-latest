import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import otpEmail from "../../assets/email-otp.png";
import OtpPopup from "./otpPopup";
import { forgetPasswordSendOtp } from "../../store/services/Auth";
import toast from "react-hot-toast";

interface ForgotPasswordProps {
  forgetonClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ forgetonClose }) => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required(),
  });

  const [sendOtp, isSendOtp]: any = useState(false);
  const [data, setData]: any = useState({});

  const apiHandler = (values: any, setSubmitting: any) => {
    forgetPasswordSendOtp({
      body: values,
    })
      .then((res: any) => {
        setTimeout(() => {
          setSubmitting(false);
          isSendOtp(true);
          toast.success(res?.msg);
          setData(values);
        }, 500);
      })
      .catch((err: any) => {
        setSubmitting(false);
        toast.error(err?.data?.error);
      });
  };

  return (
    <>
      {sendOtp ? (
        <OtpPopup
          setData={setData}
          data={data}
          onClose={forgetonClose}
          forgotpass={true} 
        />
      ) : (
        <div className="forget-popup-container">
          <div className="forget-popup">
            <button className="forget-close-btn" onClick={forgetonClose}>
              ✖
            </button>
            <div className="otp-image">
              <img src={otpEmail} alt="OTP Verification" />
            </div>
            <h2>Enter Your Email</h2>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }: any) => {
                console.log("Password reset request sent for:", values);
                apiHandler(values, setSubmitting);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="forget-input">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="input-field"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                  <button
                    type="submit"
                    className="forget-update-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send OTP"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
