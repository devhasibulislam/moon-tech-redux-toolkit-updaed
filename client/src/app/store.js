import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
import logger from "redux-logger";
import productSlice from "../features/product/productSlice";
import { productApi } from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart: cartSlice,
    filter: filterSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, productApi.middleware),
});

export default store;
