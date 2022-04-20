import axios from 'axios';

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

const getProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(getProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const defaultState = {};

export default function singleProductReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return { ...action.product };
    default:
      return state;
  }
}
