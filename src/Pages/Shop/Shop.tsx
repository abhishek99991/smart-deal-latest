import React, { useEffect, useState } from "react";
import "./shop.css";
import Header from "../../ReusableComp/Header";
import Footer from "../../ReusableComp/footer";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom";
import { getCategoryProduct } from "../../store/services/products";
import FullScreenLoader from "../../ReusableComp/FullScreenLoader";
import { Pagination } from "antd";
import { getProductDetail } from "../../store/services/products";
import {
  searchTriggerAtom,
  searchResultsAtom,
  brandCheckBoxGlobal,
} from "../../../Jotai";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

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

const Shop = () => {
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const navigate = useNavigate();
  const [searchTrigger] = useAtom(searchTriggerAtom);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse]: any = useState([]);
  const [resultSearch] = useAtom(searchResultsAtom);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [checkBoxArray, setCheckBoxArray]: any = useAtom(brandCheckBoxGlobal);
  const location = useLocation();
  const qname = location?.state?.nametoSend;

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinPrice(Number(e.target.value) || undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxPrice(Number(e.target.value) || undefined);
  };

  const clearFilter = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setMinPrice(0);
    setMaxPrice(1000);
  };
  useEffect(() => {
    if (searchTrigger) {
      setApiResponse(resultSearch);
      return;
    }
    setLoading(true);
    getCategoryProduct({
      query: {
        q: qname,
        id: params?.id,
        page: currentPage,
        min_price: minPrice,
        max_price: maxPrice,
        colors: selectedColors.length ? selectedColors.join(",") : undefined,
        brands: selectedBrands.length ? selectedBrands.join(",") : undefined,
      },
    })
      ?.then((res: any) => {
        setLoading(false);
        setTotalPages(res?.total_pages || 0);
        setApiResponse(res?.results?.products);
        setCheckBoxArray({
          available_brands: res?.results?.available_brands,
          available_colors: res?.results?.available_colors,
        });
      })
      ?.catch((err: any) => {
        console.log("err", err);
        setLoading(false);
      });
  }, [
    params.id,
    currentPage,
    resultSearch,
    minPrice,
    maxPrice,
    selectedBrands,
    selectedColors,
  ]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

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
        console.log("err", err);
        setLoading(true);
      });
  };

  return (
    <div>
      {loading && <FullScreenLoader />}
      <Header />
      <div className="container">
        {/* <h3 className="smartphone-res">Results</h3> */}
        <div className="flex space-bw shop-top">
          <div className="col-25 shop-mob-top">
            <div className="flex align-center space-bw clear-filter">
              <div>Filters</div>
              <a onClick={() => clearFilter()} href="">
                Clear Filters
              </a>
            </div>
            {/* <div className="filter-search">
              <input type="text" />
              <CiSearch className="search-icon" size={20} />
            </div> */}

            <div className="by-price">
              <h3>Price</h3>
              <div className="flex align-center space-bw by-price-inner">
                <select onChange={handleMinPriceChange}>
                  <option value="0">Min</option>
                  <option value="100">100 AED</option>
                  <option value="500">500 AED</option>
                  <option value="1000">1000 AED</option>
                  <option value="10000">10000 AED</option>
                </select>
                <p>to</p>
                <select onChange={handleMaxPriceChange}>
                  <option value="100000000">Max</option>
                  <option value="1000">1000 AED</option>
                  <option value="10000">10000 AED</option>
                  <option value="15000">15000 AED</option>
                  <option value="20000">20000 AED</option>
                  <option value="30000">30000 AED</option>
                  <option value="40000">40000 AED</option>
                </select>
              </div>
            </div>

            <div className="by-brand">
              <h3>Brands</h3>
              {checkBoxArray?.available_brands?.map((item: any) => (
                <div className="flex align-center brand-check" key={item.id}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(item)}
                    onChange={() => handleBrandChange(item)}
                  />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="by-brand">
              <h3>Color</h3>
              <div className="flex align-center">
                {checkBoxArray?.available_colors?.map((item: any) => (
                  <div
                    className="flex align-center space-bw brand-check col-20"
                    key={item.id}
                  >
                    {/* <input
                    type="checkbox"
                    checked={selectedColors.includes(item)}
                    onChange={() => handleColorChange(item)}
                  /> */}
                    <div
                      onClick={() => handleColorChange(item)}
                      style={{
                        backgroundColor: item,
                        width: "20px",
                        height: "20px",
                        border: selectedColors.includes(item)
                          ? "2px solid black"
                          : "1px solid #ccc",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-75">
            <div className="flex align-center">
              {Array.isArray(apiResponse) && apiResponse.length > 0 ? (
                apiResponse?.map((item: any) => (
                  <div
                    className="col-33 shop-cart-top"
                    key={item.id}
                    onClick={() => getProductDet(item.id)}
                  >
                    <div className="cart-img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="item-text-star">
                      <p>{item.description.slice(0, 60)}...</p>
                      <p>
                        {item.brand} {item.model}
                      </p>
                      {/* <div className="flex align-center">
                        {item.overall_rating}
                        <IoIosStar className="brown" size={20} />
                        <IoIosStar className="brown" size={20} />
                        <IoIosStar className="brown" size={20} />
                        <IoIosStarHalf className="brown" size={20} />
                        <IoIosStarOutline className="brown" size={20} />
                      </div> */}
                      <div className="flex align-center">
                        {renderStars(item.overall_rating)}
                      </div>
                      <h3 className="cart-price">
                        {item.discounted_price}
                        AED
                      </h3>
                      <div className="cart-price2">{item.price} AED</div>
                      {/* <button
                      className="add-cart-btn"
                      onClick={(e) => addCartInIcon(item.id, e)}
                    >
                      Add to Cart
                    </button> */}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products">No Products Found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          onChange={onPageChange}
          showSizeChanger={false}
          align="center"
          className="custom-pagination"
        />
      )}
      <Footer />
    </div>
  );
};

export default Shop;
