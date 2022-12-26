import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsAPI";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error: "",
  postSuccess: false,
  deleteSuccess: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const products = await fetchProducts();

    return products;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    await postProduct(productData);
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id, thunkAPI) => {
    await deleteProduct(id);
    thunkAPI.dispatch(removeFromList(id));
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
    toggleDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
    removeFromList: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // get all products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      // add new product
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.postSuccess = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.postSuccess = false;
      })
      // remove existing product
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
        state.deleteSuccess = false;
        state.isError = false;
      })
      .addCase(removeProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.deleteSuccess = true;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.deleteSuccess = false;
      });
  },
});

export const { togglePostSuccess, toggleDeleteSuccess, removeFromList } =
  productSlice.actions;

export default productSlice.reducer;
