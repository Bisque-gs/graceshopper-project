import axios from "axios"

const GET_SINGLE_USER = "GET_SINGLE_USER"
const GET_ORDER_HISTORY = "GET_ORDER_HISTORY"
const UPDATE_SINGLE_USER = "UPDATE_SINGLE_USER"
const GET_USER_CART = "GET_USER_CART"
const DELETE_ITEM_CART = "DELETE_ITEM_CART"
const UPDATE_QUANITY = "UPDATE_QUANITY"
const CHECKOUT_ITEMS = "CHECKOUT_ITEMS"
const GET_GUEST_CART = "GET_GUEST_CART"

const getGuestCart = (ordersInfo) => {
  return {
    type: GET_GUEST_CART,
    ordersInfo,
  }
}

const getUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  }
}

const updateUser = (user) => {
  return {
    type: UPDATE_SINGLE_USER,
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

const userCheckout = (order) => {
  return {
    type: CHECKOUT_ITEMS,
    order,
  }
}

const orderHistory = (orderHistory) => {
  return {
    type: GET_ORDER_HISTORY,
    orderHistory,
  }
}

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      // const token = window.localStorage.getItem("token")
      // const { data } = await axios.get(`/api/users/${id}`)
      // dispatch(getUser(data))
      if (!id) {
        // console.log("here")
        const data = window.localStorage.getItem("cart")
        // const { data } = await axios.get(`/api/users/guest/`)
        dispatch(getGuestCart(data))
      } else {
        console.log("here")
        const { data } = await axios.get(`/api/users/${id}`)
        dispatch(getUser(data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// might need to remove token here
export const updateQuantityThunk = ({ userId, productId, quantity }) => {
  return async (dispatch) => {
    // console.log(quantity)
    // need to add in guest stuff
    if (!userId) {
      const cart = window.localStorage.getItem("cart")
      // adjust cart
    } else {
      const token = window.localStorage.getItem("token")
      const { data: orderUpdated } = await axios.put(
        `/api/users/${userId}/cart/${productId}`,
        { quantity },
        {
          headers: { authorization: token },
        }
      )
      dispatch(updateQuanity(orderUpdated))
    }
  }
}

export const updateSingleUser = ({ id, field }) => {
  console.log(id, field, "RIGHT HERE")
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/users/${id}`, field)
      dispatch(updateUser(updated))
    } catch (error) {
      console.log(error)
      return dispatch(updateUser(error))
    }
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
      if (!id) {
        console.log("first")
        // get cart from localStorage
        const cart = window.localStorage.getItem("cart")
        // update item prices
        const { data } = await axios.get(`/api/users/guest/cart/`, {
          headers: { cart },
        })
        console.log("here", typeof data)
        dispatch(getGuestCart(data))
      } else {
        const { data } = await axios.get(`/api/users/${id}/cart/`)
        dispatch(getUserCart(data))
      }
    } catch (error) {
      dispatch(getUserCart({ error: error.response.data }))
    }
  }
}

export const fetchUserOrderHistory = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}/cart/orderhistory`)
      dispatch(orderHistory(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutThunk = ({ userId, itemQuantities }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}/cart/checkout`, {
        itemQuantities,
      })
      dispatch(userCheckout(data))
    } catch (error) {
      console.log(error)
      return dispatch(userCheckout({ error: error.response.data }))
    }
  }
}

const defaultState = {
  user: {},
  ordersInfo: {},
  cartItems: [],
  updatedPrices: [],
  orderHistory: {},
  error: "",
}

export default function singleUserReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      console.log("GET_SINGLE_USER")
      return { ...state, user: action.user }
    case UPDATE_SINGLE_USER:
      return { ...state, user: action.user }
    case GET_USER_CART:
      return action.error
        ? {
            ...state,
            ordersInfo: {},
            cartItems: [],
            updatedPrices: [],
            error: action.error,
          }
        : {
            ...state,
            ordersInfo: action.ordersInfo,
            cartItems: action.ordersInfo.cartItems,
            updatedPrices: action.ordersInfo.updatedPrices,
            error: "",
          }
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
        updatedPrices: state.updatedPrices.map((item) => {
          if (item.productId === action.orderUpdated.productId) {
            item.quantity = action.orderUpdated.quantity
          }
          return item
        }),
      }
    case CHECKOUT_ITEMS:
      return action.order.error
        ? {
            ...state,
            error: action.order.error,
          }
        : {
            ...state,
            cartItems: [],
            updatedPrices: [],
            error: "",
          }
    case GET_GUEST_CART:
      return { ...state, cartItems: JSON.parse(action.ordersInfo) }
    case GET_ORDER_HISTORY:
      return { ...state, orderHistory: action.orderHistory }

    default:
      return state
  }
}
