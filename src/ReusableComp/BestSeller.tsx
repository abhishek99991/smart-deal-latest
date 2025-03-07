import React from "react";
import { FaStar } from "react-icons/fa";
import { bestSellers, getProductDetail } from "../store/services/products";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  // const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<IoIosStar key={`full-${i}`} className="brown" size={20} />);
  }

  if (hasHalfStar) {
    stars.push(<IoIosStarHalf key="half" className="brown" size={20} />);
  }

  // for (let i = 0; i < emptyStars; i++) {
  //   stars.push(
  //     <IoIosStarOutline key={`empty-${i}`} className="brown" size={20} />
  //   );
  // }

  return stars;
};

const BestSeller = () => {
  const [isbestSellers, setIsBestSellers]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const navigate = useNavigate();

  const getProductDet = (id: string) => {
    setLoading(true);
    getProductDetail({
      query: {
        id: id,
      },
    })
      .then((res: any) => {
        setLoading(false);
        navigate(`/product-details/${id}`, { state: { product: res } });
      })
      .catch((err: any) => {
        setLoading(true);
      });
  };

  useEffect(() => {
    bestSellers()
      .then((res: any) => {
        setIsBestSellers(res);
      })
      .catch((err) => console.log("err", err));
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, [getProductDet]);
  return (
    <div className="container">
      {loading && <FullScreenLoader />}
      <h2 className="text-center best-seller">Best Sellers</h2>
      <div className="flex align-items">
        {isbestSellers?.map((item: any) => (
          <div
            className="col-25 seller-top"
            key={item.id}
            onClick={() => getProductDet(item?.id)}
          >
            <div className="seller-img1">
              <img src={item.image} alt="" />
            </div>
            <div className="seller-img-bottom">
              <p className="seller-text"> {item.highlights.slice(0, 60)}...</p>
              <p className="sell-sony">
                {item.brand} {item.model}
              </p>
              <div className="flex align-center">
                {renderStars(item.overall_rating)}
              </div>
              <p className="sell-sony">{item.discounted_price} AED</p>
              <p className="sell-sony sell-sony-through">{item.price} AED</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
