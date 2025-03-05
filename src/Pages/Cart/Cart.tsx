import React, { useEffect, useState } from "react";
import "./cart.css";
import Header from "../../ReusableComp/Header";
import Footer from "../../ReusableComp/footer";
import { FaArrowRight } from "react-icons/fa";
import {
  cartListApi,
  cartQuantityManager,
  removeCartItem,
} from "../../store/services/products";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { cartCountApiCaller } from "../../../Jotai";

interface Product {
  image: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  id: string;
}

interface CartItemType {
  product: Product;
  quantity: number;
}

const CartItem = ({ item, cartListDataApiResponse }: any) => {
  const [, setCartCountApiCall] = useAtom(cartCountApiCaller);
  const [cartValue, setCartValue] = useState(item?.quantity || 1);
  const cartQuantity = (quantity: any) => {
    cartQuantityManager({
      body: {
        product_id: item?.product?.id,
        temp: "yes",
        quantity,
      },
    })
      ?.then(() => {
        cartListDataApiResponse();
      })
      ?.catch((err: any) => console.log("err", err));
  };

  const decreaseCount = () => {
    if (cartValue > 1) {
      setCartValue(cartValue - 1);
      cartQuantity(cartValue - 1);
    }
  };

  const increaseCount = () => {
    setCartValue(cartValue + 1);
    cartQuantity(cartValue + 1);
  };

  const removeCartItemHandler = (product_id: any) => {
    removeCartItem({
      query: {
        product_id,
      },
    })
      ?.then(() => {
        toast.success("Remove item Successfully.");
        cartListDataApiResponse();
        setCartCountApiCall((oldVal: any) => oldVal + 1);
      })
      ?.catch((err: any) => console.log("err", err));
  };

  return (
    <div className="flex space-bw shopping-beg-top">
      <div className="col-25 shopping-cart-img">
        <img src={item?.product?.image} alt={item?.product?.description} />
      </div>
      <div className="col-25 shopping-jbl-product cart-pd-top">
        <div>{item?.product?.brand}</div>
        <div>{item?.product?.model}</div>
        <div>{item?.product?.description}</div>
      </div>
      <div className="col-25 shopping-jbl-product cart-pd-top">
        <div>{item?.product?.price} AED</div>
      </div>
      <div className="col-25 text-center cart-pd-top">
        <div className="flex align-center cart-plus-minus-head">
          <div className="cart-minus" onClick={decreaseCount}>
            -
          </div>
          <div className="cart-val">{cartValue}</div>
          <div className="cart-plus" onClick={increaseCount}>
            +
          </div>
        </div>
        <div className="cart-remove">
          <button onClick={() => removeCartItemHandler(item.product.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const [cartItems, setCartItems]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coupon, setCoupon] = useState("");

  const handleCoupon = (e: any) => {
    setCoupon(e.target.value);
  };

  const [data, setdata]: any = useState();
  const cartListDataApiResponse = async () => {
    setLoading(true);
    try {
      const res: any = await cartListApi({
        query: {
          coupon: coupon,
        },
      });
      setCartItems(res?.items || []);
      setdata(res);
    } catch (err: any) {
      console.error("Error fetching cart data:", err);
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cartListDataApiResponse();
  }, []);
  const inputArrow = () => {
    cartListDataApiResponse();
  };

  const subtotal = cartItems.reduce(
    (acc: any, item: any) => acc + item?.product?.price * item?.quantity,
    0
  );
  const delivery = 51.0;
  const total = subtotal + delivery;

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container">Loading cart...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="container">Error: {error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="shopping-bag">Shopping Bag</h2>
        <div className="flex space-bw">
          <div className="col-70 ">
            {cartItems?.length > 0 ? (
              cartItems?.map((item: CartItemType) => (
                <CartItem
                  key={item?.product?.id}
                  item={item}
                  cartListDataApiResponse={cartListDataApiResponse}
                />
              ))
            ) : (
              <h2 className="cart-emp">Cart is empty!</h2>
            )}
          </div>
          <div className="col-30">
            <div className="flex align-center apply-coupan">
              <div className="brown">Apply Coupon</div>
              <FaArrowRight size={18} className="yellow" />
            </div>
            <div className="cart-input-top">
              <input
                type="text"
                value={coupon}
                onChange={handleCoupon}
                placeholder="Enter coupon code"
              />
              <div className="cart-input-arrrow" onClick={inputArrow}>
                <FaArrowRight size={18} className="white" />
              </div>
            </div>
            <div className="cart-order">Order Summary</div>
            <div className="flex align-center space-bw order-subtotal">
              <div>Subtotal</div>
              <div>{data?.total_price}</div>
            </div>
            <div className="flex align-center space-bw order-subtotal">
              <div>Extra Discount</div>
              <div>{data?.extra_discount} AED</div>
            </div>
            <div className="flex align-center space-bw order-subtotal">
              <div>Total Discount</div>
              <div>{data?.total_dicount} AED</div>
            </div>
            <div className="flex align-center space-bw order-subtotal order-total">
              <div>Total</div>
              <div>{data?.discounted_price} AED</div>
            </div>
            <div className="cart-go-to">
              <button>Go to Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
