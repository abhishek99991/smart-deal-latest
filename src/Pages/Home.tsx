import { useState, useEffect } from "react";
import Navbar from "../ReusableComp/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BestSeller from "../ReusableComp/BestSeller";
import Footer from "../ReusableComp/footer";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import SliderSection from "../ReusableComp/sliderSection";
import { getCategories } from "../store/services/Auth";
import { useNavigate } from "react-router-dom";
import { allBanners } from "../store/services/products";

const Home = () => {
  const [banners, setBanners]: any = useState([]);
  const [categories, setCategories]: any = useState([]);
  const navigate: any = useNavigate();

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <MdOutlineKeyboardArrowLeft
        className="custom-arrow custom-prev"
        onClick={onClick} // Fix: Add onClick handler
      />
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <MdKeyboardArrowRight
        className="custom-arrow custom-next"
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 7,
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
          slidesToShow: 4,
          slidesToScroll: 1,
          prevArrow: true,
          nextArrow: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getCategories()
      .then((res: any) => {
        setCategories(res);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const clickParticularItem = (cat_id: any) => {
    navigate(`/shop/${cat_id}`);
  };

  const getAllBannerHandler = () => {
    allBanners()
      .then((res: any) => {
        setBanners(res?.data);
      })
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    getAllBannerHandler();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container slider-head">
        <Slider {...settings}>
          {categories?.map((item: any) => (
            <div
              className="slide-top"
              key={item.id}
              onClick={() => clickParticularItem(item.id)}
            >
              <div className="slide">
                <img src={item.category_image} />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </Slider>
      </div>

      <div className="container">
        <div className="flex align-center space-bw banner-head">
          <div className="col-40 banner-text text-center">
            <h1>
              Your one stop <br />
              for the best <br /> Products
            </h1>
            <div className="flex align-center banner-btn">
              <button className="exp-products">Explore Products</button>
              <button className="get-started">Get Started</button>
            </div>
          </div>
          <div className="col-60 banner-img">
            <img
              src={
                banners?.find((item: any) => item?.banner_type === "Main")
                  ?.banner_image
              }
              alt=""
            />
          </div>
        </div>
      </div>

      <BestSeller />

      <SliderSection />

      <div className="container">
        <h2 className="shop-brand text-center">Shop by Brand</h2>
        <div className="flex align-center space-bw shop-brand-inner">
          {banners
            ?.filter((item: any) => item?.banner_type === "Brands")
            ?.map((obj: any) => (
              <div key={obj?.id} className="col-25">
                <img src={obj?.banner_image} alt="" />
              </div>
            ))}
        </div>
      </div>

      <div className="container">
        <h2 className="shop-brand text-center">Offers of the Week</h2>
        <div className="flex align-center space-bw offer-week-head">
          {banners
            ?.filter((item: any) => item?.banner_type === "WeekOffers")
            ?.map((obj: any) => (
              <div className="col-33" key={obj?.id}>
                <img src={obj?.banner_image} alt="" />
              </div>
            ))}
        </div>
      </div>

      <div className="container">
        <h2 className="shop-brand text-center">New Arrivals</h2>
        <div className="flex space-bw new-arrival-head">
          <div className="col-33">
            <img
              src={
                banners?.filter(
                  (item: any) => item?.banner_type === "NewArrivals1"
                )?.[0]?.banner_image
              }
              alt=""
            />
          </div>
          <div className="col-33">
            <div className="half-arrival">
              <img
                src={
                  banners?.filter(
                    (item: any) => item?.banner_type === "NewArrivals2"
                  )?.[0]?.banner_image
                }
                alt=""
              />
            </div>
            <div className="half-arrival">
              <img
                src={
                  banners?.filter(
                    (item: any) => item?.banner_type === "NewArrivals2"
                  )?.[1]?.banner_image
                }
                alt=""
              />
            </div>
          </div>
          <div className="col-33">
            <img
              src={
                banners?.filter(
                  (item: any) => item?.banner_type === "NewArrivals1"
                )?.[1]?.banner_image
              }
              alt=""
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
