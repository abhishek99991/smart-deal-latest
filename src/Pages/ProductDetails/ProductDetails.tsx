import React, { useEffect } from "react";
import Header from "../../ReusableComp/Header";
import Footer from "../../ReusableComp/footer";
import "./productdetails.css";
// import ProductMainImg from "../../assets/product-main-img.png";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
// import ProductSmallImg from "../../assets/product-small-img.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
// import phone_icon from "../../assets/ds-mob-icon.png";
import BestSeller from "../../ReusableComp/BestSeller";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useAtom } from "jotai";
import { cartQuantityManager } from "../../store/services/products";
import { cartCountApiCaller } from "../../../Jotai";
import toast from "react-hot-toast";
import { productReviews } from "../../store/services/products";
import { useParams } from "react-router-dom";
import { postReviews } from "../../store/services/products";

const ProductDetails = () => {
  const params: any = useParams();
  console.log("params", params);
  const [reviews, setReviews]: any = useState([]);
  const location = useLocation();
  const product = location.state?.product; // Access passed data
  const [, setCartCountApiCall] = useAtom(cartCountApiCaller);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [showRating, setShowRating]: any = useState();
  const [isRatingPopup, setIsRatingPopup] = useState(false);

  const [selectedRating, setSelectedRating]: any = useState(null);
  const [comment, setComment]: any = useState();
  const openRatingPopup = () => setIsRatingPopup(true);
  const closeRatingPopup = () => setIsRatingPopup(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (!product) {
    return <h2>No Product Details Available</h2>;
  }
  const colors = Array.isArray(product.color) ? product.color : [product.color];
  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <MdOutlineKeyboardArrowLeft
        className={className}
        style={{
          ...style,
          display: "block",
          color: "black",
          fontSize: "24px",
          position: "absolute",
          left: "45%",
          // bottom:"-60px",
          zIndex: 1,
          cursor: "pointer",
          backgroundColor: "efefef",
          borderRadius: "10px",
          top: "180px",
        }}
        onClick={onClick} // Fix: Add onClick handler
      />
    );
  };

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <MdKeyboardArrowRight
        className={className}
        style={{
          ...style,
          display: "block",
          color: "black",
          fontSize: "24px",
          position: "absolute",
          right: "45%",
          // bottom:"-60px",
          zIndex: 1,
          cursor: "pointer",
          backgroundColor: "efefef",
          borderRadius: "10px",
          top: "180px",
        }}
        onClick={onClick} // Fix: Add onClick handler
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const changeMainImg = (image: any) => {
    setSelectedImage(image);
  };

  const addCartInIcon = (id: any, e: any) => {
    e.stopPropagation();
    cartQuantityManager({
      body: {
        product_id: id,
        quantity: 1,
      },
    })
      .then(() => {
        toast.success("Item added to cart! 🛒");
        setCartCountApiCall((oldVal: any) => oldVal + 1);
      })
      .catch((err: any) => {
        console.error("Error adding to cart:", err);
        toast.error("Failed to add item to cart.");
      });
  };

  useEffect(() => {
    if (params?.id) {
      productReviews({
        pathParams: {
          id: params?.id,
        },
      })
        .then((res: any) => {
          setReviews(res.data);
          setShowRating(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [params?.id]);
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);
  const highlightsArray = (product.highlights || "").split("\r\n");

  const handleStarClick = (value: number) => {
    setSelectedRating(value);
  };

  const SubmitReviewsBtn = () => {
    if (!comment || comment.trim().length === 0) {
      toast.error("Review comment & rating is required.");
      return;
    }
    if (!selectedRating) {
      toast.error("Please select a rating.");
      return;
    }
    postReviews({
      body: {
        comment: comment,
        rating: selectedRating,
      },
      pathParams: {
        id: params?.id,
      },
    })
      .then((res: any) => {
        toast.success("Review submitted successfully.");
        setComment("");
        setSelectedRating(null);
        closeRatingPopup();
      })
      .catch((err: any) => {
        console.error("Error submitting review:", err);
        toast.error(err);
      });
  };
  return (
    <div>
      <Header />
      <div className="container">
        <div className="flex space-bw">
          <div className="col-40">
            <div className="product-main-img">
              <img src={selectedImage} alt="Selected Product" />
            </div>
          </div>
          <div className="col-60">
            <h3 className="jbl-bluetooth">
              {product.brand} {product.model}
            </h3>
            <div className="flex">
              <IoIosStar size={20} className="brown" />
              <IoIosStar size={20} className="brown" />
              <IoIosStar size={20} className="brown" />
              <IoIosStarHalf size={20} className="brown" />
              <IoIosStarOutline size={20} className="brown" />
            </div>
            <h2 className="jbl-price">
              {" "}
              {(product.price * (100 - product.discount) * 0.01).toFixed(2)} AED
            </h2>
            <h2 className="jbl-price line-th">{product.price} AED</h2>
            <div className="flex align-center product-small-img">
              <div className="small-color">Color:</div>
              {colors.map((color: any, index: any) => (
                <div
                  key={index}
                  className="product-color-changer"
                  style={{ backgroundColor: color }}
                />
              ))}
              {/* <div className="flex align-center">
                <div className="product-small-img-inner">
                  <img src={ProductSmallImg} alt="" />
                </div>
                <div className="product-small-img-inner">
                  <img src={ProductSmallImg} alt="" />
                </div>
                <div className="product-small-img-inner">
                  <img src={ProductSmallImg} alt="" />
                </div>
                <div className="product-small-img-inner">
                  <img src={ProductSmallImg} alt="" />
                </div>
              </div> */}
            </div>
            <div className="flex description-head">
              <div className="description">Description:</div>
              <p className="col-80">{product.description}</p>
            </div>
            <div className="flex description-head">
              <div className="description">Highlights:</div>
              <div className="highlights-list">
                <ul>
                  {highlightsArray.map((highlight: any, index: any) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="product-detail-cart-btn"
              onClick={(e) => addCartInIcon(product.id, e)}
            >
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="flex align-center col-50 product-angles-img-top">
          <div
            className={`product-small-img-btm ${
              selectedImage === product.image ? "product-active-img" : ""
            }`}
            onClick={() => changeMainImg(product.image)}
          >
            <img src={product.image} alt="" />
          </div>
          {product.all_images.map((item: any) => (
            <div
              className={`product-small-img-btm ${
                selectedImage === item.image ? "product-active-img" : ""
              }`}
              key={item.id}
              onClick={() => setSelectedImage(item.image)}
              style={{ cursor: "pointer" }} // Add pointer cursor for better UX
            >
              <img src={item.image} alt="Thumbnail" />
            </div>
          ))}
        </div>

        <div className="specification-top">
          <div className="specification-text">Specifications</div>
          <div className="specific-textarea">
            {" "}
            <textarea name="" id=""></textarea>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex">
          <div className="col-50">
            <h3 className="ratings-header">Ratings & Review</h3>
            <div className="ratings-content">
              <div className="ratings-summary">
                <div className="rating-score">
                  <span className="score">{showRating?.overall_rating}</span> ★
                </div>
                <div className="rating-info">
                  {showRating?.total_ratings} Ratings & Reviews
                </div>
              </div>
              {/* {item?.count/showRating?.total_ratings*100} */}
              <div className="ratings-breakdown">
                {showRating?.rating_distribution.map(
                  (item: any, index: any) => {
                    const maxCount = Math.max(
                      ...showRating?.rating_distribution.map(
                        (item: any) => item.count
                      ),
                      1
                    );

                    const widthPercentage =
                      item.count === 0 ? 0 : (item.count / maxCount) * 100;
                    const RatingWidth = { width: `${widthPercentage}%` };

                    return (
                      <div className="rating-bar" key={index}>
                        <span>{item?.rating} ★</span>
                        <div className="bar">
                          <div
                            className={`fill five-star star-${item?.rating}`}
                            style={RatingWidth}
                          ></div>
                        </div>
                        <span>{item?.count}</span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className="col-50 text-right">
            <button className="rate-button" onClick={openRatingPopup}>
              Rate The Product
            </button>
          </div>
          {isRatingPopup && (
            <div className="ratingpp-overlay">
              <div className="ratingpp-content">
                <span className="ratingpp-close-btn" onClick={closeRatingPopup}>
                  &times;
                </span>
                <h2 className="rating-review">Rating & Reviews</h2>
                <p className="rating-review">Overall Rating</p>
                <div className="flex align-center ratingpp-star">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <IoIosStar
                      key={value}
                      size={20}
                      className={`brown ${
                        selectedRating >= value ? "selected-star" : ""
                      }`}
                      onClick={() => handleStarClick(value)}
                      style={{
                        cursor: "pointer",
                        color: selectedRating >= value ? "#FEE506" : "#ccc",
                      }}
                    />
                  ))}
                </div>
                <div className="ratingpp-textarea">
                  <textarea
                    placeholder="Write your review..."
                    rows={8}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required={true}
                  ></textarea>
                </div>
                <button
                  className="ratingpp-submit-btn"
                  onClick={SubmitReviewsBtn}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {reviews.length > 1 ? (
        <div className="container slider-head">
          <Slider {...settings} slidesToShow={Math.min(reviews.length, 2)}>
            {reviews.map((item: any) => (
              <div className="product-cards-top" key={item.id}>
                <div className="product-card-text">
                  {item?.user?.first_name} {item?.user?.last_name}
                </div>
                <div className="flex product-card-para">
                  {[...Array(item.rating)].map((_, index) => (
                    <IoIosStar key={index} size={20} className="brown" />
                  ))}
                  {[...Array(5 - item.rating)].map((_, index) => (
                    <IoIosStarOutline key={index} size={20} className="brown" />
                  ))}
                </div>
                <p className="product-card-para">{item.comment}</p>
                <p className="product-card-para">
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(item.created_at)
                  )}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      ) : reviews.length === 1 ? (
        <div className="container single-review">
          <div className="product-cards-top">
            <div className="product-card-text">
              {reviews[0]?.user?.first_name} {reviews[0]?.user?.last_name}
            </div>
            <div className="flex product-card-para">
              {[...Array(reviews[0].rating)].map((_, index) => (
                <IoIosStar key={index} size={20} className="brown" />
              ))}
              {[...Array(5 - reviews[0].rating)].map((_, index) => (
                <IoIosStarOutline key={index} size={20} className="brown" />
              ))}
            </div>
            <p className="product-card-para">{reviews[0].comment}</p>
            <p className="product-card-para">
              {new Intl.DateTimeFormat("en-GB").format(
                new Date(reviews[0].created_at)
              )}
            </p>
          </div>
        </div>
      ) : null}

      <BestSeller />

      <Footer />
    </div>
  );
};

export default ProductDetails;
