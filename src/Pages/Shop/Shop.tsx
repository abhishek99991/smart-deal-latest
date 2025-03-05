import React, { useEffect, useState } from "react";
import "./shop.css";
import Header from "../../ReusableComp/Header";
import Footer from "../../ReusableComp/footer";
import { CiSearch } from "react-icons/ci";
import ShopCartImg from "../../assets/shop-mobile-img.png";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { getCategoryProduct } from "../../store/services/products";
import FullScreenLoader from "../../ReusableComp/FullScreenLoader";
import { Pagination } from "antd";
import { getProductDetail } from "../../store/services/products";

import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  searchTriggerAtom,
  searchResultsAtom,
  cartCountApiCaller,
} from "../../../Jotai";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { cartQuantityManager } from "../../store/services/products";

const Shop = () => {
  // const [regularList, setRegularList]: any = useState([]);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const navigate = useNavigate();
  const [searchTrigger] = useAtom(searchTriggerAtom);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse]: any = useState([]);
  const [resultSearch] = useAtom(searchResultsAtom);
  const [, setCartCountApiCall] = useAtom(cartCountApiCaller);
  const [filterData, setFilterData]: any = useState([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

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
  // useEffect(() => {
  //   getCategoryProduct({
  //     query: {
  //       min_price: minPrice,
  //       max_price: maxPrice,
  //       colors: selectedColors.length ? selectedColors.join(",") : undefined,
  //       brands: selectedBrands.length ? selectedBrands.join(",") : undefined,
  //     },
  //   }).then((res: any) => {
  //     setFilterData(res?.results);
  //   });
  // }, []);

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
        console.log("reshhhhhhhhhhhhhhhhhh", res);
      })
      .catch((err: any) => {
        console.log("err", err);
        setLoading(true);
      });
  };

  // const addCartInIcon = (id: any, e: any) => {
  //   e.stopPropagation();
  //   cartQuantityManager({
  //     body: {
  //       product_id: id,
  //       quantity: 1,
  //     },
  //   })
  //     .then(() => {
  //       toast.success("Item added to cart! 🛒");
  //       setCartCountApiCall((oldVal: any) => oldVal + 1);
  //     })
  //     .catch((err: any) => {
  //       console.error("Error adding to cart:", err);
  //       toast.error("Failed to add item to cart.");
  //     });
  // };
  return (
    <div>
      {loading && <FullScreenLoader />}
      <Header />
      <div className="container">
        <h3 className="smartphone-res">Results for Smartphones</h3>
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
              <h3>By Price</h3>
              <div className="flex align-center space-bw by-price-inner">
                <select onChange={handleMinPriceChange}>
                  <option value="">0</option>
                  <option value="10000">{"\u20B9"}10000</option>
                  <option value="15000">{"\u20B9"}15000</option>
                  <option value="20000">{"\u20B9"}20000</option>
                  <option value="30000">{"\u20B9"}30000</option>
                </select>
                <p>to</p>
                <select onChange={handleMaxPriceChange}>
                  <option value="10000">{"\u20B9"}10000</option>
                  <option value="15000">{"\u20B9"}15000</option>
                  <option value="20000">{"\u20B9"}20000</option>
                  <option value="30000">{"\u20B9"}30000</option>
                  <option value="40000">{"\u20B9"}40000+</option>
                </select>
              </div>
            </div>

            <div className="by-brand">
              <h3>By Brands</h3>
              {searchResults?.available_brands?.map((item: any) => (
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
              <h3>By Color</h3>
              {searchResults?.available_colors?.map((item: any) => (
                <div className="flex align-center brand-check" key={item.id}>
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(item)}
                    onChange={() => handleColorChange(item)}
                  />
                  <p>{item}</p>
                </div>
              ))}
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
                      <p>
                        {item.brand} {item.model}
                      </p>
                      <p>{item.description.slice(0, 60)}...</p>
                      <div className="flex align-center">
                        <IoIosStar className="brown" size={20} />
                        <IoIosStar className="brown" size={20} />
                        <IoIosStar className="brown" size={20} />
                        <IoIosStarHalf className="brown" size={20} />
                        <IoIosStarOutline className="brown" size={20} />
                      </div>
                      <h3 className="cart-price">
                        {(item.price * (100 - item.discount) * 0.01).toFixed(2)}
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
        />
      )}
      <Footer />
    </div>
  );
};

export default Shop;
