import React, { useEffect, useState } from "react";
import SpeakerSlider from "../assets/slider-speaker.png";
import Slider from "react-slick";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import speakerSliderImg from "../assets/speaker-slider-img.png";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { getProductDetail, randomCategory } from "../store/services/products";
import { useNavigate } from "react-router-dom";

const sliderSection = () => {
  const [sliderData, setSliderData]: any = useState([]);
  const navigate = useNavigate();
  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <MdOutlineKeyboardArrowLeft
        className="slider-sec-custom-arrow slider-sec-custom-prev"
        onClick={onClick} // Fix: Add onClick handler
      />
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <MdKeyboardArrowRight
        className="slider-sec-custom-arrow slider-sec-custom-next"
        onClick={onClick} // Fix: Add onClick handler
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
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
          prevArrow: false,
          nextArrow: false,
          dots: true,
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

  useEffect(() => {
    randomCategory()
      .then((res: any) => {
        console.log("khkhkjhk", res.data);
        setSliderData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProductDetail = (id: string) => {
    // setLoading(true);
    getProductDetail({
      query: {
        id: id,
      },
    })
      .then((res: any) => {
        // setLoading(false);
        navigate(`/product-details/${id}`, { state: { product: res } });
        console.log("reshhhhhhhhhhhhhhhhhh", res);
      })
      .catch((err: any) => {
        console.log("err", err);
        // setLoading(true);
      });
  };

  return (
    <div>
      {sliderData.map((item: any) => (
        <div className="container slider-top">
          <div className="flex align-center space-bw" key={item.id}>
            <div className="col-40 speaker-slider-img">
              <h3>{item.category.name}</h3>
              <div className="speaker-slider-img-inner">
                <img src={item.category.category_image} alt="" />
              </div>
            </div>

            <div className="col-60 speaker-slide">
              <Slider {...settings}>
                {item.products.map((product: any) => (
                  <div
                    className="slide-top-head"
                    key={product.id}
                    onClick={() => handleProductDetail(product.id)}
                  >
                    <div className="slide-speaker speaker-margin">
                      <img src={product.image} alt="Slide 1" />
                    </div>
                    <div className="bose-smart-top">
                      <div className="bose-smart-text">
                        {product.brand} {product.model}
                      </div>
                      <div className="flex align-center">
                        <IoIosStar className="brown" size={20} />
                        <IoIosStar className="brown" size={20} />
                        <IoIosStar className="brown" size={20} />
                        <IoIosStarHalf className="brown" size={20} />
                        <IoIosStarOutline className="brown" size={20} />
                      </div>
                      <div className="flex align-center speaker-price-top">
                        <div className="speaker-price-head">
                          <div className="speaker-price-first">
                            {" "}
                            {(
                              product.price *
                              (100 - product.discount) *
                              0.01
                            ).toFixed(2)}
                            AED
                          </div>
                          <div className="speaker-price-second line-through">
                            {product.price}
                          </div>
                        </div>
                        <div className="speaker-price-off">
                          {product.discount}%
                        </div>
                      </div>
                      {/* <div className="flex align-center speaker-add-buy">
                                       <div className='speaker-add'><button>Add to Cart</button></div>
                                       <div className='speaker-buy'><button>Buy Now</button></div>
                                   </div> */}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default sliderSection;
