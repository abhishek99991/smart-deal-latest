import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
// import { IoSearchOutline } from "react-icons/io5";
import OtpPopup from "../Pages/Pop ups/otpPopup";
import SignIn from "../Pages/Pop ups/SignIn";
import Register from "../Pages/Pop ups/Register";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cartCountApi, searchProducts } from "../store/services/products";
import { getCategoryProduct } from "../store/services/products";
import { FaList } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useRef } from "react";

import {
  brandCheckBoxGlobal,
  cartCountApiCaller,
  registerPageClick,
  searchTriggerAtom,
} from "../../Jotai"; // Create a global state
import { useAtom } from "jotai";
import { searchResultsAtom } from "../../Jotai";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults]: any = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, setSearchTrigger] = useAtom(searchTriggerAtom);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [, setSearchResultsFinal] = useAtom(searchResultsAtom);
  const [, setIsRegister] = useAtom(registerPageClick);
  const [currentCartCount, setCurrentCartCount] = useState(0);
  const [cartCountApiCall] = useAtom(cartCountApiCaller);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [, setCheckBoxArray]: any = useAtom(brandCheckBoxGlobal);

  const handleUserClick = () => {
    if (token) {
      navigate("/user");
    } else {
      setIsLoginOpen(true);
    }
  };
  const handleRegister = () => {
    setIsLoginOpen(false);
    setIsRegister(true);
    setIsOtpPopupOpen(true);
  };
  const handleOtpSuccess = () => {
    setActiveTab("signin");
    setIsOtpPopupOpen(false);
    setIsLoginOpen(true);
  };

  const cartClickHandler = () => {
    navigate("/cart");
  };

  const SearchApiHandler = () => {
    if (search.length > 0) {
      searchProducts({
        query: {
          q: search,
        },
      })
        .then((res: any) => {
          setSearchResults(res.suggestions);

          if (res.suggestions.length > 0) {
            setIsDropdownOpen(true);
          }

          console.log(res.suggestions.length);
        })
        .catch((err: any) => {
          console.error("Search API error:", err);
        });
    } else {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      SearchApiHandler();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const getSearchResponse = (name: any) => {
    setSearchTrigger(true);

    getCategoryProduct({
      query: {
        q: name,
      },
    })
      .then((res: any) => {
        navigate("/shop"); // Change from "./shop" to "/shop" (absolute path)
        setIsDropdownOpen(false);
        setCheckBoxArray({
          available_brands: res?.results?.available_brands,
          available_colors: res?.results?.available_colors,
        });
        setSearchResultsFinal(res.results.products);
      })
      .catch((err: any) => {
        console.error("Search API error:", err);
      })
      .finally(() => {
        setTimeout(() => setSearchTrigger(false), 1000); // Reset trigger after a short delay
      });
  };

  const cartCountHandler = () => {
    if (localStorage.getItem("accessToken")) {
      cartCountApi()
        .then((res: any) => {
          setCurrentCartCount(res?.cart_count);
        })
        ?.catch((err: any) => console.log("err", err));
    }
  };

  useEffect(() => {
    cartCountHandler();
  }, [cartCountApiCall]);

  const handleSearchClick = () => {
    getCategoryProduct({
      query: {
        q: search,
      },
    })
      .then((res: any) => {
        navigate("/shop");
        setIsDropdownOpen(false);
        setSearchResults(res.results.products);
        setCheckBoxArray({
          available_brands: res?.results?.available_brands,
          available_colors: res?.results?.available_colors,
        });
      })
      .catch((err: any) => {
        console.error("Error fetching search results:", err);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false); // Close search box
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]); // Run effect when isSearchOpen changes

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false); // Close sidebar when clicking outside
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="nav-top header-desktop">
        <div className="container flex align-center space-bw nav-head desk-header">
          <div className="flex align-center nav-items col-33">
            <Link
              to="/"
              className={`text-gray-700 hover:text-black ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-gray-700 hover:text-black ${
                location.pathname === "/shop" ? "active" : ""
              }`}
            >
              Shop
            </Link>
            <Link
              to="/about-us"
              className={`text-gray-700 hover:text-black ${
                location.pathname === "/about-us" ? "active" : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contact-us"
              className={`text-gray-700 hover:text-black ${
                location.pathname === "/contact-us" ? "active" : ""
              }`}
            >
              Contact
            </Link>
          </div>

          <a href="/" className="ds-logo">
            <img src={logo} alt="" />
          </a>
          <div className="col-33 flex align-center icons-head">
            <div className="header-search-input">
              <input
                type="text"
                placeholder="Search Products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* onClick={handleSearchClick} */}
              <CiSearch
                className="header-search-icon"
                onClick={handleSearchClick}
              />
              {isDropdownOpen && (
                <ul className="search-dropdown">
                  {searchResults.map((item: any) => (
                    <li
                      key={item.id}
                      onClick={() => getSearchResponse(item.name)}
                    >
                      <div>{item.name}</div>
                      <p>{item.type || ""}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {localStorage.getItem("accessToken") ? (
              <div onClick={handleUserClick}>
                <CiUser color="#fff" className="icon" size={20} />
              </div>
            ) : (
              <div onClick={handleUserClick} className="login-header">
                Login
              </div>
            )}

            {localStorage.getItem("accessToken") && (
              <div onClick={cartClickHandler} className="headercart-val-head">
                <CiShoppingCart color="#fff" className="icon" size={20} />
                {currentCartCount !== 0 && <span>{currentCartCount}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="nav-top header-mob pos-rel">
        <div className="container flex align-center space-bw nav-head desk-header">
          <div className="list-header-icon-head col-33">
            <div
              className="list-header-icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaList color="#fff" />
            </div>
            <div
              ref={menuRef}
              id="list-header-icon-inner"
              className={`nav-items nav-items-mob ${
                isMenuOpen ? "active" : ""
              }`}
            >
              <Link to="/" className="text-gray-700 hover:text-black">
                Home
              </Link>
              <Link to="/shop" className="text-gray-700 hover:text-black">
                Shop
              </Link>
              <Link to="/about-us" className="text-gray-700 hover:text-black">
                About
              </Link>
              <Link to="/contact-us" className="text-gray-700 hover:text-black">
                Contact
              </Link>
            </div>
          </div>

          <a href="/" className="ds-logo">
            <img src={logo} alt="" />
          </a>
          <div className="col-33 flex align-center icons-head mob-profile-search-head">
            <div className="mob-header-search-head">
              <div
                className="mob-header-search-icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <CiSearch color="#fff" size={20} />{" "}
              </div>
              <div
                ref={searchRef}
                id="mob-header-search-inner"
                className={`header-search-input header-search-input-mob ${
                  isSearchOpen ? "active" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Search Products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* onClick={handleSearchClick} */}
                <CiSearch className="header-search-icon" />
                {isDropdownOpen && (
                  <ul className="search-dropdown">
                    {searchResults.map((item: any) => (
                      <li
                        key={item.id}
                        onClick={() => getSearchResponse(item.name)}
                      >
                        <div>{item.name}</div>
                        <p>{item.type || ""}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {localStorage.getItem("accessToken") ? (
              <div onClick={handleUserClick}>
                <CiUser color="#fff" className="icon" size={20} />
              </div>
            ) : (
              <div className="login-header" onClick={handleUserClick}>
                Login
              </div>
            )}

            {localStorage.getItem("accessToken") && (
              <div onClick={cartClickHandler} className="headercart-val-head">
                <CiShoppingCart color="#fff" className="icon" size={20} />
                {currentCartCount !== 0 && <span>{currentCartCount}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoginOpen && (
        <div
          className="login-popup-overlay"
          onClick={() => setIsLoginOpen(false)}
        >
          <div className="login-popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsLoginOpen(false)}>
              ✖
            </button>
            <div className="login-tabs">
              <span
                className={`tab ${activeTab === "signin" ? "active" : ""}`}
                onClick={() => setActiveTab("signin")}
              >
                SIGN IN
              </span>
              <span
                className={`tab ${activeTab === "register" ? "active" : ""}`}
                onClick={() => setActiveTab("register")}
              >
                I'M NEW HERE
              </span>
            </div>

            {activeTab === "signin" ? (
              <SignIn
                onSwitch={() => setActiveTab("register")}
                onClose={() => setIsLoginOpen(false)}
              />
            ) : (
              <Register
                onSwitch={() => setActiveTab("signin")}
                onRegister={handleRegister}
                onClose={() => setIsLoginOpen(false)}
              />
            )}
          </div>
        </div>
      )}

      {isOtpPopupOpen && (
        <OtpPopup
          onClose={() => setIsOtpPopupOpen(false)}
          onOtpSuccess={handleOtpSuccess}
        />
      )}
    </>
  );
};

export default Header;
