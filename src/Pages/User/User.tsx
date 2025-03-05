import React, { useEffect, useState } from 'react'
import './user.css'
import Header from '../../ReusableComp/Header'
import Footer from '../../ReusableComp/footer'
import { FaUser } from "react-icons/fa";
import OrderImg from "../../assets/order-img.png"
import securityImg from "../../assets/security-img-user.png"
import addressImg from "../../assets/addresses-img-user.png"
import ContactImg from "../../assets/contact-us-img-user.png"
import aboutImg from "../../assets/about-us-user.png"
import CoupanImg from "../../assets/coupans-user.png"
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/services/Auth';
import toast from 'react-hot-toast';
import { getUserDetails } from '../../store/services/Auth';
import { Link } from 'react-router-dom';


const User = () => {
  const [userData, setUserData]:any = useState()
  // const data = getUserDetails();

  const Navigate = useNavigate()

  const token = localStorage.getItem("accessToken")


  const logoutUserbtn = () => {
    logoutUser()
      .then((res: any) => {
        localStorage.removeItem("accessToken");
        sessionStorage.clear();
        localStorage.clear();
        Navigate("/");
        toast.success("Logout user successfully.");
      })
      .catch((err: any) => {
        console.error("Logout error:", err);
        toast.error("Something went wrong.");
      });
  };
  
  useEffect(() => {
    getUserDetails()
      .then((res: any) => {
        setUserData(res);
      
      })
      .catch((err) => console.log("err", err));
      
  }, []);
  


  
  return ( 
    <div> 
      <Header/>
        <div className="container user-head-top">
            <h2 className='public-profile'>Profile</h2>
            <div className="flex space-bw">
                  <div className="col-25 profile-top">
                        <div className='profile-icon text-center'><FaUser className='main-icon' size={100}/>
                        </div>
                        <div className='user-name text-center'>
                        {userData ? `${userData.first_name} ${userData.last_name}` : "Loading..."}
                        </div>
                        <div className='user-email'>
                          <p>EMAIL</p>
                          <div className='email-inner'>
                          {userData ? `${userData.email}` : "Loading..."}
                          </div>
                        </div>
                        <div className='user-email'>
                          <p>PHONE</p>
                          <div className='email-inner'>
                          {userData ? `${userData.phone}` : "Loading..."}
                          </div>
                        </div>
                        <div className='user-email'>
                          <p>Location</p>
                          <div className='email-inner'>
                          {userData ? `${userData.address}` : "Loading..."}
                          </div>
                        </div>
                        <div className='user-email'>
                          <p>Date of Birth</p>
                          <div className='email-inner'>
                          {userData ? `${userData.dob}` : "Loading..."}
                          </div>
                        </div>
                        <Link to='/login-security' className='user-logout text-center'><button>Edit Profile</button></Link>

                          <div className='user-logout text-center' onClick={logoutUserbtn}><button>Logout</button></div>
                  </div>
                  <div className="col-75">
                      <div className="flex align-center space-bw">
                            <div className="col-33 flex align-center space-bw your-order-top">
                                <div className='order-img col-40'><img src={OrderImg} alt="" /></div>
                                <div className='order-text col-60'>
                                  <div>Your Orders</div>
                                  <p>Track, Return or Buy Things Again</p>
                                </div>
                            </div>
                            <div className="col-33 flex align-center space-bw your-order-top">
                                <div className='order-img col-40'><img src={securityImg} alt="" /></div>
                                <div className='order-text col-60'>
                                  <div>Security & Privacy</div>
                                  <p>Edit Name, Phone Number, and password</p>
                                </div>
                            </div>
                            <div className="col-33 flex align-center space-bw your-order-top">
                                <div className='order-img col-40'><img src={addressImg} alt="" /></div>
                                <div className='order-text col-60'>
                                  <div>Your Addresses</div>
                                  <p>Edit or Add Addresses for Orders</p>
                                </div>
                            </div>
                            <div className="col-33 flex align-center space-bw your-order-top">
                                <div className='order-img col-40'><img src={ContactImg} alt="" /></div>
                                <div className='order-text col-60'>
                                  <div>Contact Us</div>
                                  <p>Contact our customer support via phone or chat</p>
                                </div>
                            </div>
                            <div className="col-33 flex align-center space-bw your-order-top">
                                <div className='order-img col-40'><img src={aboutImg} alt="" /></div>
                                <div className='order-text col-60'>
                                  <div>About Us</div>
                                  <p>Know about Us</p>
                                </div>
                            </div>
                            <div className="col-33 flex align-center space-bw your-order-top">
                                <div className='order-img col-40'><img src={CoupanImg} alt="" /></div>
                                <div className='order-text col-60'>
                                  <div>My Coupons</div>
                                  <p>See all the available coupons</p>
                                </div>
                            </div>

                      </div>
                  </div>
            </div>
        </div>
      <Footer/>
    </div>
  )
}

export default User