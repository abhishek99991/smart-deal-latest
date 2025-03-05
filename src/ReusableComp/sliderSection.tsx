import React from 'react'
import SpeakerSlider from '../assets/slider-speaker.png'
import Slider from 'react-slick';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import speakerSliderImg from "../assets/speaker-slider-img.png";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";


const sliderSection = () => {
    const CustomPrevArrow = (props: any) => {
      const {onClick } = props;
      return (
        <MdOutlineKeyboardArrowLeft
         className="slider-sec-custom-arrow slider-sec-custom-prev"
          // style={{
          //   ...style, 
          //   display: "block",
          //   color: "black",
          //   fontSize: "24px",
          //   position: "absolute",
          //   left: "46%",
          //   // bottom:"-60px",
          //   zIndex: 1,
          //   cursor: "pointer",
          //    backgroundColor:"efefef",
          //   borderRadius:"10px",
          //   top:"430px"
          // }}
          onClick={onClick} // Fix: Add onClick handler
        />
      );
    };
    
    const CustomNextArrow = (props: any) => {
      const {onClick } = props;
      return (
        <MdKeyboardArrowRight
         className="slider-sec-custom-arrow slider-sec-custom-next"
          // style={{
          //   ...style,
          //   display: "block",
          //   color: "black",
          //   fontSize: "24px",
          //   position: "absolute",
          //   right: "47%",
          //   // bottom:"-60px",
          //   zIndex: 1,
          //   cursor: "pointer",
          //   backgroundColor:"efefef",
          //   borderRadius:"10px",
          //   top:"430px"
  
          // }}
          onClick={onClick} // Fix: Add onClick handler
        />
      );
    };
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 1000,
      arrows: true, 
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:false,
            nextArrow:false,
            dots:true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,

          },
        },
      ],
    };
  return (
    <div>
      <div className="container slider-top">
          <div className="flex align-center space-bw">
              <div className="col-30 speaker-slider-img">
                  <img src={SpeakerSlider} alt="" />
              </div>
              <div className="col-70 speaker-slide">
              <Slider {...settings}>
          <div className="slide-top-head">
            <div className="slide-speaker speaker-margin"><img src={speakerSliderImg} alt="Slide 1" /></div>
            <div className='bose-smart-top'>
              <div className='bose-smart-text'>Bose Smart Soundbar 892079-4100 Black</div>
                 <div className="flex align-center">
                           <IoIosStar className='brown' size={20}/>
                            <IoIosStar className='brown' size={20}/>
                            <IoIosStar className='brown' size={20}/>
                            <IoIosStarHalf className='brown' size={20}/>
                            <IoIosStarOutline className='brown' size={20}/>
                   </div>
                   <div className="flex align-center speaker-price-top">
                      <div className='speaker-price-head'>
                          <div className='speaker-price-first'>2099.00 AED</div>
                          <div className='speaker-price-second'>2099.00 AED</div>
                      </div>
                      <div className='speaker-price-off'>30%</div>
                   </div>
                   <div className="flex align-center speaker-add-buy">
                          <div className='speaker-add'><button>Add to Cart</button></div>
                          <div className='speaker-buy'><button>Buy Now</button></div>
                      </div>
            </div>
          </div>
          <div className="slide-top-head">
            <div className="slide-speaker speaker-margin"><img src={speakerSliderImg} alt="Slide 1" /></div>
            <div className='bose-smart-top'>
              <div className='bose-smart-text'>Bose Smart Soundbar 892079-4100 Black</div>
                 <div className="flex align-center">
                           <IoIosStar className='brown' size={20}/>
                            <IoIosStar className='brown' size={20}/>
                            <IoIosStar className='brown' size={20}/>
                            <IoIosStarHalf className='brown' size={20}/>
                            <IoIosStarOutline className='brown' size={20}/>
                   </div>
                   <div className="flex align-center speaker-price-top">
                      <div className='speaker-price-head'>
                          <div className='speaker-price-first'>2099.00 AED</div>
                          <div className='speaker-price-second'>2099.00 AED</div>
                      </div>
                      <div className='speaker-price-off'>30%</div>
                   </div>
                   <div className="flex align-center speaker-add-buy">
                          <div className='speaker-add'><button>Add to Cart</button></div>
                          <div className='speaker-buy'><button>Buy Now</button></div>
                      </div>
            </div>
          </div>
          <div className="slide-top-head">
            <div className="slide-speaker speaker-margin"><img src={speakerSliderImg} alt="Slide 1" /></div>
            <div className='bose-smart-top'>
              <div className='bose-smart-text'>Bose Smart Soundbar 892079-4100 Black</div>
                 <div className="flex align-center">
                           <IoIosStar className='brown' size={20}/>
                            <IoIosStar className='brown' size={20}/>
                            <IoIosStar className='brown' size={20}/>
                            <IoIosStarHalf className='brown' size={20}/>
                            <IoIosStarOutline className='brown' size={20}/>
                   </div>
                   <div className="flex align-center speaker-price-top">
                      <div className='speaker-price-head'>
                          <div className='speaker-price-first'>2099.00 AED</div>
                          <div className='speaker-price-second'>2099.00 AED</div>
                      </div>
                      <div className='speaker-price-off'>30%</div>
                   </div>
                   <div className="flex align-center speaker-add-buy">
                          <div className='speaker-add'><button>Add to Cart</button></div>
                          <div className='speaker-buy'><button>Buy Now</button></div>
                      </div>
            </div>
          </div>
        </Slider>
              </div>
          </div>
      </div>
    </div>
  )
}

export default sliderSection;