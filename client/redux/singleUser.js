import axios from "axios"

const GET_SINGLE_USER = "GET_SINGLE_USER"
const GET_USER_CART = "GET_USER_CART"
const DELETE_ITEM_CART = "DELETE_ITEM_CART"
const UPDATE_QUANITY = "UPDATE_QUANITY"
const CHECKOUT_ITEMS = "CHECKOUT_ITEMS"

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
  }
}

const deleteItemCart = (order) => {
  return {
    type: DELETE_ITEM_CART,
    order,
  }
}

const updateQuanity = (orderUpdated) => {
  return {
    type: UPDATE_QUANITY,
    orderUpdated,
  }
}

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
export const updateQuantityThunk = ({ userId, productId, quantity }) => {
  return async (dispatch) => {
    console.log(quantity)
    const { data: orderUpdated } = await axios.put(
      `/api/users/${userId}/cart/${productId}`,
      { quantity }
    )
    console.log("THIS IS SPARTAAAAAAAAAA", orderUpdated)
    dispatch(updateQuanity(orderUpdated))
  }
}

//We dont want to delete the item we just want to delete the order of the item. Need to access and
//delete the item from the junction table
export const deleteItemCartThunk = ({ userId, productId }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/users/${userId}/cart/${productId}`
      )
      dispatch(deleteItemCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchUserCart = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}/cart/`)
      dispatch(getUserCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const defaultState = {
  user: {},
  ordersInfo: {},
  cartItems: [],
  updatedPrices: [], // here?
}

export default function singleUserReducer(state = defaultState, action) {
  switch (action.type) {
    // case GET_SINGLE_USER:
    //   return { ...action.user }
    case GET_SINGLE_USER:
      return { ...state, user: action.user }
    case GET_USER_CART:
      return {
        ...state,
        ordersInfo: action.ordersInfo,
        cartItems: action.ordersInfo.cartItems,
        updatedPrices: action.ordersInfo.updatedPrices,
      }
    // return {
    //   ...state,
    //   ordersInfo: action.ordersInfo,
    //   cartItems: {
    //     ...action.ordersInfo.cartItems, action.ordersInfo.cartItems.map((item) => {
    //     item.quantity
    //   }) }
    // }
    case DELETE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.order.productId
        ),
      }
    case UPDATE_QUANITY:
      return {
        ...state,
        itemQuantities: state.itemQuantities.map((item) => {
          if (item.productId === action.orderUpdated.productId) {
            item.quantity = action.orderUpdated.quantity
          }
          return item
        }),
      }
    //  return {
    //    ...state,
    //    cartItems: state.cartItems.map((item) => {
    //      if (item.id === action.orderUpdated.productId) {
    //        ordersInfo = action.orderUpdated.quantity
    //      }
    //      return item
    //    }),
    //  }
    default:
      return state
  }
}
