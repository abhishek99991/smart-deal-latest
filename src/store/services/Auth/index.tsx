import { callApi } from "../../../Api/apiUtils";
import { authEndpoints } from "../../endpoints/Auth";

export const registerUser = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.registerUser.v1,
    body,
  });

  export const sendOtpEmail = ({ body }: any) =>
    callApi({
      uriEndPoint: authEndpoints.sendOtpEmail.v1,
      body,
      withCredentials:true
      
    });

  export const loginApiCall = ({ body }: any) =>
      callApi({
        uriEndPoint: authEndpoints.userLogin.v1,
        body,
      });

  export const logoutUser = () =>
        callApi({
          uriEndPoint: authEndpoints.logoutUser.v1,
        });

  export const getUserDetails = () =>
          callApi({
            uriEndPoint: authEndpoints.getUserDetails.v1,
          });

 export const getCategories = () =>
          callApi({
           uriEndPoint: authEndpoints.getCategories.v1,
           });
           
 export const forgetPasswordSendOtp = ({body}: any) =>
          callApi({
           uriEndPoint: authEndpoints.forgetPasswordSendOtp.v1,
           body
           });

export const verifyOtpForgot = ({body}: any) =>
callApi({
  uriEndPoint: authEndpoints.verifyOtpForgot.v1,
  body
  });

export const resetPassword = ({body}: any) =>
    callApi({
      uriEndPoint: authEndpoints.resetPassword.v1,
      body
      });
export const updateProfile = ({body}: any) =>
    callApi({
      uriEndPoint: authEndpoints.updateProfile.v1,
      body
      });
      
export const updatePassword = ({body}: any) =>
    callApi({
      uriEndPoint: authEndpoints.updatePassword.v1,
      body
      });
      
export const resendOtp = ({body}: any) =>
    callApi({
      uriEndPoint: authEndpoints.resendOtp.v1,
      body
      });
      
export const contactUsForm = ({body}: any) =>
    callApi({
      uriEndPoint: authEndpoints.contactUsForm.v1,
      body
      });
  
           