import axios from "axios"

const SET_PRODUCTS = "SET_PRODUCTS"
const DELETE_PRODUCT = "DELETE_PRODUCT"
const ADD_PRODUCT = "ADD_PRODUCT"
const CREATE_PRODUCT = "CREATE_PRODUCT"

const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  }
}

const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  }
}

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")

      const { data } = await axios.get("/api/products", {
        headers: { authorization: token },
      })
      dispatch(setProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteProductThunk = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")
      const { data: product } = await axios.delete(
        `/api/protected/products/${productId}`,
        {
          headers: { authorization: token },
        }
      )
      dispatch(deleteProduct(product))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products]
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id)
    case CREATE_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
