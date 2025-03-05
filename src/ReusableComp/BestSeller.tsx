import React from "react";
import { FaStar } from "react-icons/fa";
import { bestSellers, getProductDetail } from "../store/services/products";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";

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
        console.log("reshhhhhhhhhhhhhhhhhh", res);
      })
      .catch((err: any) => {
        console.log("err", err);
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

  console.log("first", isbestSellers);
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
            <p className="seller-text"> {item.highlights.slice(0, 60)}...</p>
            <p className="sell-sony">
              {item.brand} {item.model}
            </p>
            <FaStar color="#DE7921" />
            <p className="sell-sony">
              {(item.price * (100 - item.discount) * 0.01).toFixed(2)} AED
            </p>
            <p className="sell-sony sell-sony-through">{item.price} AED</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
