import axios from "axios"
import history from "../history"

const TOKEN = "token"

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH"

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth })

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

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  window.localStorage.setItem("cart", "[]")
  history.push("/login")
  return {
    type: SET_AUTH,
    auth: {},
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
