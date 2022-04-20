import axios from "axios"

const GET_SINGLE_USER = 'GET_SINGLE_USER';
const GET_USER_CART = 'GET_USER_CART';

const getUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  }
}

const getUserCart = (user) => {
  return {
    type: GET_USER_CART,
    user,
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`)
      // const { data } = await axios.get(`/api/orders/${id}`);
      dispatch(getUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchUserCart = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}/orders`);
      dispatch(getUserCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const defaultState = {};

export default function singleUserReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return { ...action.user }
    default:
      return state
  }
}
