import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products];
    case ADD_PRODUCT:
      return [...state, action.product];
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
