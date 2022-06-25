import axios from "axios"

const GET_USERS = "GET_USERS"

export const getUsers = (users) => {
  return {
    type: GET_USERS,
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
      dispatch(getUsers(data))
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
    default:
      return state
  }
}
