import { userContants } from "../actions/constants";

const initState = {
  error: "",
  message: "",
  users: [],
  loading: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userContants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userContants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userContants.USER_REGISTER_FAILED:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userContants.GET_ALL_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        users: action.payload.users,
      };
      break;
    default:
      break;
  }
  return state;
};

export default userReducer;
