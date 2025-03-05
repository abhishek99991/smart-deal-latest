import { callApi } from "../../../Api/apiUtils";
import { productEndpoints } from "../../endpoints/products";

export const cartListApi = ({ query }: any) =>
  callApi({
    uriEndPoint: productEndpoints.cartList.v1,
    query,
  });

export const cartQuantityManager = ({ body }: any) =>
  callApi({
    uriEndPoint: productEndpoints.cartQuantityManager.v1,
    body,
  });

export const removeCartItem = ({ query }: any) =>
  callApi({
    uriEndPoint: productEndpoints.removeCartItem.v1,
    query,
  });

export const getCategoryProduct = ({ query }: any) =>
  callApi({
    uriEndPoint: productEndpoints.getCategoryProduct.v1,
    query,
  });
export const getProductDetail = ({ query }: any) =>
  callApi({
    uriEndPoint: productEndpoints.getProductDetail.v1,
    query,
  });
export const searchProducts = ({ query }: any) =>
  callApi({
    uriEndPoint: productEndpoints.searchProducts.v1,
    query,
  });

export const cartCountApi = () =>
  callApi({
    uriEndPoint: productEndpoints.cartCount.v1,
  });

export const productReviews = ({ pathParams }: any) =>
  callApi({
    uriEndPoint: productEndpoints.productReviews.v1,
    pathParams,
  });
export const postReviews = ({ body, pathParams }: any) =>
  callApi({
    uriEndPoint: productEndpoints.postReviews.v1,
    body,
    pathParams,
  });
export const allBanners = () =>
  callApi({
    uriEndPoint: productEndpoints.allBanners.v1,
  });
  
export const bestSellers = () =>
  callApi({
    uriEndPoint: productEndpoints.bestSellers.v1,
  });
