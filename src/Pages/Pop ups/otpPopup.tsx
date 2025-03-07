import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import otpImage from "../../assets/email-otp.png";
import ChangePassword from "./ChangePassword";
import { sendOtpEmail, verifyOtpForgot } from "../../store/services/Auth";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { registerPageClick, UserEmail } from "../../../Jotai";
import { resendOtp } from "../../store/services/Auth";
import { forgetPasswordSendOtp } from "../../store/services/Auth";
import FullScreenLoader from "../../ReusableComp/FullScreenLoader";

const OtpPopup = ({ setData, data, onClose, forgotpass }: any) => {
  const [varifyOtp, setVarifyOtp]: any = useState(false);
  const [finalEmail]: any = useAtom(UserEmail);
  const [isRegister, setIsRegister] = useAtom(registerPageClick);
  const [loading, setLoading] = useState(false);
  const otpSchema = Yup.object().shape({
    otp: Yup.array()
      .of(
        Yup.string()
          .matches(/^[0-9]$/, "Must be a number")
          .required("Required")
      )
      .length(4, "OTP must be 4 digits"),
  });

  const apiHandler = (values: any) => {
    setLoading(true);
    const body = {
      email: data?.email,
      otp: values?.otp?.join(""),
    };
    if (forgotpass) {
      verifyOtpForgot({
        body,
      })
        ?.then((res: any) => {
          toast.success(res?.msg);
          setVarifyOtp(true);
          setData(body);
          setIsRegister(false);
          setLoading(true);
        })
        ?.catch((err: any) => {
          toast.error(err?.data?.error);
        })
        .finally(() => setLoading(false));
    } else if (isRegister) {
      sendOtpEmail({
        body: {
          email: finalEmail,
          otp: values?.otp?.join(""),
        },
      })
        ?.then((res: any) => {
          toast.success(res.msg);
          localStorage.setItem("accessToken", res.token.access);
          if (onClose) {
            onClose();
          }
          setVarifyOtp(false);
          setLoading(true);
        })
        ?.catch((err: any) => console.log("err", err))
        .finally(() => setLoading(false));
    }
  };

  const handleResendOtp = () => {
    setLoading(true);
    if (forgotpass) {
      forgetPasswordSendOtp({
        body: {
          email: finalEmail || data?.email,
        },
      })
        .then((res: any) => {
          toast.success(res.msg);
          setLoading(true);
        })
        ?.catch((err: any) => console.log("err", err))
        .finally(() => setLoading(false));
    } else {
      resendOtp({
        body: {
          email: finalEmail || data?.email,
        },
      })
        .then((res: any) => {
          toast.success(res.msg);
          setLoading(true);
        })
        ?.catch((err: any) => console.log("err", err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      {" "}
      {loading && <FullScreenLoader />}
      {!varifyOtp ? (
        <div className="otp-popup-overlay" onClick={onClose}>
          <div className="otp-popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>
              ✖
            </button>

            <div className="otp-image">
              <img src={otpImage} alt="OTP Verification" />
            </div>

            <h2 className="otp-title">OTP Verification</h2>
            <p className="otp-text">
              OTP has been sent to <strong>{finalEmail || data.email}</strong>
            </p>

            <Formik
              initialValues={{ otp: ["", "", "", ""] }}
              validationSchema={otpSchema}
              onSubmit={(values) => {
                apiHandler(values);
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => (
                <Form className="otp-form" onSubmit={handleSubmit}>
                  <div className="otp-inputs">
                    {values.otp.map((_, index) => (
                      <Field
                        key={index}
                        name={`otp[${index}]`}
                        type="text"
                        maxLength={1}
                        className="otp-input"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          if (e.target.value && index < 3) {
                            document
                              .getElementsByName(`otp[${index + 1}]`)[0]
                              ?.focus();
                          }
                        }}
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          if (
                            e.key === "Backspace" &&
                            !values.otp[index] &&
                            index > 0
                          ) {
                            document
                              .getElementsByName(`otp[${index - 1}]`)[0]
                              ?.focus();
                          }
                        }}
                        onBlur={handleBlur}
                      />
                    ))}
                  </div>

                  {/* <div className="resend-text">
            Get OTP on Email?{" "}
            <a onClick={!loading ? handleResendOtp : undefined}>
              {loading ? "Sending..." : "Click to resend"}
            </a>
    </div> */}
                  <p className="resend-text">
                    Didn’t get the OTP?{" "}
                    <a onClick={!loading ? handleResendOtp : undefined}>
                      {loading ? "Sending..." : "Click to resend"}
                    </a>
                  </p>

                  <button
                    type="submit"
                    className="otp-verify-btn"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify the Code"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <ChangePassword data={data} forgetonClose={onClose} />
      )}
    </>
  );
};

export default OtpPopup;
