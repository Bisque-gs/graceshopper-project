import axios from "axios"

const GET_USERS = "GET_USERS"

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  }
}

// export const fetchUsers = (str) => {
//   return async (dispatch) => {
//     try {
//       console.log(str)
//       const { data } = await axios.get("/api/users")
//       dispatch(getUsers(data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

export const fetchUsers = (id) => {
  return async (dispatch) => {
    try {
      console.log(id)
      const { data } = await axios.get(`/api/users/${id}/users`)
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
