import React from 'react'
import './searchResult.css'
import Header from '../../ReusableComp/Header'
import Footer from '../../ReusableComp/footer'
import { CiSearch } from "react-icons/ci";
import ShopCartImg from "../../assets/shop-mobile-img.png"
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";


  


const Shop = () => {


  return (
    <div>
        <Header/>
          <div className="container">
              <h3>Results for Smartphones</h3>
              <div className="flex space-bw shop-top">
                  <div className="col-25 shop-mob-top">
                      <div className="flex align-center space-bw clear-filter">
                          <div>Filters</div>
                          <a href="">Clear Filters</a>
                      </div>
                      <div className='filter-search'>
                        <input type="text" />
                        <CiSearch className='search-icon' size={20}/>
                      </div>

                      {/* <div className='by-price'>
                        <h3>By Price</h3>
                          <div className="flex align-center space-bw by-price-inner">
                                <select name="" id="">
                                  <option value="">Min</option>
                                  <option value="">{'\u20B9'}10000</option>
                                  <option value="">{'\u20B9'}15000</option>
                                  <option value="">{'\u20B9'}20000</option>
                                  <option value="">{'\u20B9'}30000</option>
                                </select>
                                <p>to</p>
                                <select name="" id="">
                                <option value="">{'\u20B9'}10000</option>
                                  <option value="">{'\u20B9'}15000</option>
                                  <option value="">{'\u20B9'}20000</option>
                                  <option value="">{'\u20B9'}30000
                                  </option>  
                                  <option value="">{'\u20B9'}30000+
                                  </option>                              
                                  </select>
                          </div>
                      </div>

                        <div className="by-brand">
                            <h3>By Brands</h3>
                            <div className="flex align-center brand-check">
                                <input type="checkbox" />
                                <p>Apple</p>
                            </div>
                            <div className="flex align-center brand-check">
                                <input type="checkbox" />
                                <p>Samsung</p>
                            </div>
                            <div className="flex align-center brand-check">
                                <input type="checkbox" />
                                <p>Huawei</p>
                            </div>
                            <div className="flex align-center brand-check">
                                <input type="checkbox" />
                                <p>Nothing</p>
                            </div>
                        </div>

                        <div className="by-brand">
                            <h3>By Color</h3>
                            <div className="flex align-center brand-check">
                                <input type="checkbox" />
                                <p>Blue</p>
                            </div>
                            <div className="flex align-center brand-check">
                                <input type="checkbox" />
                                <p>Red</p>
                            </div>
                            <div className="flex align-center brand-check">
                                <input type="checkbox" />
                                <p>Black</p>
                            </div>
                            <div className="flex align-center brand-check">
                                <input type="checkbox" />
                                <p>White</p>
                            </div>
                        </div> */}
                  </div>
                  <div className="col-75">
                      <div className="flex align-center space-bw">
                            <div className="col-33 shop-cart-top">
                                  <div className='cart-img'><img src={ShopCartImg} alt=""/></div>
                                  <div className="item-text-star">
                                    <p>1 Year Manufacturer Warranty for Device and 6 Months for In-Box Accessories</p>
                                    <div className="flex align-center">
                                            <IoIosStar className='brown' size={20}/>
                                            <IoIosStar className='brown' size={20}/>
                                            <IoIosStar className='brown' size={20}/>
                                            <IoIosStarHalf className='brown' size={20}/>
                                            <IoIosStarOutline className='brown' size={20}/>
                                    </div>
                                    <h3 className='cart-price'>999.00 AED</h3>
                                    <div className='cart-price2'>1299.00 AED</div>
                                    <button className='add-cart-btn'>Add to Cart</button>
                                  </div>
                            </div>
                            <div className="col-33 shop-cart-top">
                                  <div className='cart-img'><img src={ShopCartImg} alt=""/></div>
                                  <div className="item-text-star">
                                    <p>1 Year Manufacturer Warranty for Device and 6 Months for In-Box Accessories</p>
                                    <div className="flex align-center">
                                            <IoIosStar className='brown' size={20}/>
                                            <IoIosStar className='brown' size={20}/>
                                            <IoIosStar className='brown' size={20}/>
                                            <IoIosStarHalf className='brown' size={20}/>
                                            <IoIosStarOutline className='brown' size={20}/>
                                    </div>
                                    <h3 className='cart-price'>999.00 AED</h3>
                                    <div className='cart-price2'>1299.00 AED</div>
                                    <button className='add-cart-btn'>Add to Cart</button>
                                  </div>
                            </div>
                            <div className="col-33 shop-cart-top">
                                  <div className='cart-img'><img src={ShopCartImg} alt=""/></div>
                                  <div className="item-text-star">
                                    <p>1 Year Manufacturer Warranty for Device and 6 Months for In-Box Accessories</p>
                                    <div className="flex align-center">
                                            <IoIosStar className='brown' size={20}/>
                                            <IoIosStar className='brown' size={20}/>
                                            <IoIosStar className='brown' size={20}/>
                                            <IoIosStarHalf className='brown' size={20}/>
                                            <IoIosStarOutline className='brown' size={20}/>
                                    </div>
                                    <h3 className='cart-price'>999.00 AED</h3>
                                    <div className='cart-price2'>1299.00 AED</div>
                                    <button className='add-cart-btn'>Add to Cart</button>
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

export default Shop