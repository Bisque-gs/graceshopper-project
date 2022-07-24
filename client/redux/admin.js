import axios from "axios"

const GET_USERS = "GET_USERS"
const SEARCH_USERS = "SEARCH_USERS"

const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  }
}

const searchUsers = (users) => {
  return {
    type: SEARCH_USERS,
    users,
  }
}

export const fetchUsers = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.get(`/api/protected/users/${id}/users`, {
        headers: { authorization: token },
      })
      console.log(data)
      dispatch(searchUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchUserSearch = (id, search) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.get(
        `/api/protected/users/${id}/users/search`,
        {
          headers: { authorization: token, search },
        }
      )
      console.log(data)
      dispatch(searchUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

export default function adminUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return [...action.users]
    case SEARCH_USERS:
      return [...action.users]
    default:
      return state
  }
}
