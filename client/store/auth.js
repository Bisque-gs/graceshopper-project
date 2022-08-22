import axios from "axios"
import history from "../history"

const TOKEN = "token"

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH"
const USER_RESET = "USER_RESET"
/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth })

const userReset = (auth) => {
  return {
    type: USER_RESET,
    auth,
  }
}
/**
 * THUNK CREATORS
 */

//IF THERES A USER WITH THAT TOKEN, SEND THEM THE USER
//IF USER AND PASS MATCHES SOMETHING IN DB
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    })
    return dispatch(setAuth(res.data))
  }
}

//DECIDES WHAT TO DO WHETHER LOGGED IN OR SIGN UP
//USES ME TO CHECK WHETHER THE TOKENS MATCH UP
export const authenticate =
  (username, password, email, method) => async (dispatch) => {
    try {
      const payload = email
        ? { username, password, email }
        : { username, password }
      const res = await axios.post(`/auth/${method}`, payload)
      window.localStorage.setItem(TOKEN, res.data.token)
      dispatch(me())
    } catch (authError) {
      return dispatch(setAuth({ error: authError }))
    }
  }

export const reset = (email) => {
  return async (dispatch) => {
    try {
      console.log("gE reset Redux", email)
      const { data } = await axios.put(`/auth/reset`, {
        email,
      })
      dispatch(userReset(data))
    } catch (error) {
      console.log(error)
      return dispatch(userReset({ error: error.response.data }))
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  window.localStorage.setItem("cart", "[]")
  history.push("/login")
  return {
    type: SET_AUTH,
    auth: {},
  }
}

const defaultState = {
  user: {},
  error: "",
}

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case USER_RESET:
      return action.auth.error
        ? {
            ...state,
            error: action.auth.error,
          }
        : {
            ...state,
            error: "",
          }
    default:
      return state
  }
}
