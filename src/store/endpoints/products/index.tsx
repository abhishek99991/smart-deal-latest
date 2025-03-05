import { defaults } from "../../default";

export const productEndpoints = {
  cartList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/cart/",
    },
  },
  cartQuantityManager: { 
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/cart/",
    },
  },
  removeCartItem: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/cart/",
    },
  },
  getCategoryProduct: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1, 
      uri: "/products/",
    },
  },
  getProductDetail: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/product-detail/",
    },
  },
  searchProducts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/search/",
    },
  },
  cartCount: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/cart-count/",
    },
  },
  productReviews: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/reviews/:id/",
    },
  },
  postReviews: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/reviews/:id/",
    },
  },

  allBanners: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/banners/",
    },
  },
  bestSellers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/bestsellers/",
    },
  },

}

