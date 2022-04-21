import axios from "axios"

const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT"
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"

const getProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  }
}

const addProductToCart = (product) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product,
  }
}

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const setOrder = (userId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/api/users/${userId}/orders/${productId}/${quantity}`,
        { isCurrentOrder: true, userId }
      )
      dispatch(addProductToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const defaultState = {}

export default function singleProductReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return { ...action.product }
    case ADD_PRODUCT_TO_CART:
      return { ...state, ...action.product }
    default:
      return state
  }
}
