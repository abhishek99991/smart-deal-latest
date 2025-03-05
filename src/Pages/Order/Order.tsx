import React from 'react'
import './order.css'
import Header from '../../ReusableComp/Header'
import Footer from '../../ReusableComp/footer'

const Order = () => {
  return (
    <div>
      <Header/>
        <div className="container order-container">
            <h2 className='your-order'>Your Orders</h2>
            <div className="flex align-center order-placed">
              <div>Orders placed in last</div>
              <select name="" id="">
                <option value="">1month</option>
                <option value="">2month</option>
              </select>
            </div>
            <div className='order-card-top'>
                  <div className='order-id'>Order ID: #23445567ygtrf67</div>
                 <div className="flex space-bw order-card-head">
                 <div className="col-33 order-card-img"><img src="" alt="" /></div>
                  <div className="col-33 order-card-mid">
                      <h3 className='order-lorem'>Lorem Ipsum</h3>
                      <p className='order-para'>Lorem ipsum is a dummy or 
                            placeholder text commonly used 
                            in graphic design, publishing, </p>
                      <div className="flex space-bw align-center order-placed-top">
                        <div className='order-placed'>
                          <div>Order Placed on</div>
                          <p>31 Jan 2025</p>
                        </div>
                        <div className='order-placed'>
                        <div>Total</div>
                        <p>1089.00 AED</p>
                        </div>
                      </div>
                  </div>
                  <div className="col-33">
                     <div className='order-cancel-track'><button>Cancel Order</button></div>
                     <div className='order-cancel-track'><button>Track Package</button></div>
                      <div className='order-cancel-track'><button>Write a Product Review</button></div>
                  </div>
                 </div>
            </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Order