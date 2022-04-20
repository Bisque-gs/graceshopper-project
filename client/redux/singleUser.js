import axios from 'axios';

const GET_SINGLE_USER = 'GET_SINGLE_USER';

const getUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(getUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const defaultState = {};

export default function singleUserReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return { ...action.user };
    default:
      return state;
  }
}