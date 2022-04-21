import axios from "axios"

const GET_SINGLE_USER = 'GET_SINGLE_USER';
const GET_USER_CART = 'GET_USER_CART';
const DELETE_ITEM_CART = 'DELETE_ITEM_CART';

const getUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  }
}

const getUserCart = (ordersInfo) => {
  return {
    type: GET_USER_CART,
    ordersInfo,
  };
};

const deleteItemCart = (item) => {
  return {
    type: DELETE_ITEM_CART,
    item,
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

//We dont want to delete the item we just want to delete the order of the item. Need to access and 
//delete the item from the junction table 
export const deleteItemCartThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}/orders`);
      dispatch(getUserCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

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

const defaultState = {
  user: {},
  ordersInfo: {}
};

export default function singleUserReducer(state = defaultState, action) {
  switch (action.type) {
    // case GET_SINGLE_USER:
    //   return { ...action.user }
    case GET_SINGLE_USER:
      return { ...state, user: action.user }
        case GET_USER_CART:
      return { ...state, ordersInfo: action.ordersInfo }
            case DELETE_ITEM_CART:
      // return {
      //   ...state, ordersInfo: {
      //     ...state.ordersInfo,
      //     ordersInfo.cartItems:
          
      // } }
      // return {
      //   ...state, ordersInfo: {
      //     ...ordersInfo, cartItems: cartItems.filter((item) => {
        
      // }) }}
    
    
    default:
      return state
  }
}
