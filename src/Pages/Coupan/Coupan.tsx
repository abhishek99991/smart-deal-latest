import React from 'react'
import './coupan.css'
import Header from '../../ReusableComp/Header'
import Footer from '../../ReusableComp/footer'
import CoupanCard from "../../assets/coupan-card.png"


const Coupan = () => {
  return (
    <div>
      <Header/>
          <div className="container coupan-top-head">
              <h2 className='your-coupan'>Your Coupons</h2>
                <div className="flex space-bw">
                    <div className="col-50 coupan-card-head flex space-bw">
                          <div className='coupan-img col-30'><img src={CoupanCard} alt="" /></div>
                          <div className='coupan-text-head col-70'>
                            <div><b>Lorem ipsum</b> is a dummy or 
                            placeholder text commonly used in graphic design,</div>
                            <p>Get Flat 15%</p>
                            <div className='apply-btn'><button>Apply</button></div>
                          </div>
                    </div>
                    <div className="col-50 coupan-card-head flex space-bw">
                          <div className='coupan-img col-30'><img src={CoupanCard} alt="" /></div>
                          <div className='coupan-text-head col-70'>
                            <div><b>Lorem ipsum</b> is a dummy or 
                            placeholder text commonly used in graphic design,</div>
                            <p>Get Flat 15%</p>
                            <div className='apply-btn'><button>Apply</button></div>
                          </div>
                    </div>
                    <div className="col-50 coupan-card-head flex space-bw">
                          <div className='coupan-img col-30'><img src={CoupanCard} alt="" /></div>
                          <div className='coupan-text-head col-70'>
                            <div><b>Lorem ipsum</b> is a dummy or 
                            placeholder text commonly used in graphic design,</div>
                            <p>Get Flat 15%</p>
                            <div className='apply-btn'><button>Apply</button></div>
                          </div>
                    </div>
                    <div className="col-50 coupan-card-head flex space-bw">
                          <div className='coupan-img col-30'><img src={CoupanCard} alt="" /></div>
                          <div className='coupan-text-head col-70'>
                            <div><b>Lorem ipsum</b> is a dummy or 
                            placeholder text commonly used in graphic design,</div>
                            <p>Get Flat 15%</p>
                            <div className='apply-btn'><button>Apply</button></div>
                          </div>
                    </div>
                    <div className="col-50 coupan-card-head flex space-bw">
                          <div className='coupan-img col-30'><img src={CoupanCard} alt="" /></div>
                          <div className='coupan-text-head col-70'>
                            <div><b>Lorem ipsum</b> is a dummy or 
                            placeholder text commonly used in graphic design,</div>
                            <p>Get Flat 15%</p>
                            <div className='apply-btn'><button>Apply</button></div>
                          </div>
                    </div>
                    <div className="col-50 coupan-card-head flex space-bw">
                          <div className='coupan-img col-30'><img src={CoupanCard} alt="" /></div>
                          <div className='coupan-text-head col-70'>
                            <div><b>Lorem ipsum</b> is a dummy or 
                            placeholder text commonly used in graphic design,</div>
                            <p>Get Flat 15%</p>
                            <div className='apply-btn'><button>Apply</button></div>
                          </div>
                    </div>
                </div>
          </div>
      <Footer/>
    </div>
  )
}

export default Coupan