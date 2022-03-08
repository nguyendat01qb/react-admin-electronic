import axios from "../helpers/axios";
import { userContants } from "./constants";

export const signup = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: userContants.USER_REGISTER_REQUEST });
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: userContants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userContants.USER_REGISTER_FAILED,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

// export const getUsers = () => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: userContants.GET_ALL_USER_REQUEST });
//       const res = await axios.post(`admin/users`);
//       console.log(res);
//       if (res.status === 200) {
//         // const { users } = res.data;
//         dispatch({
//           type: userContants.GET_ALL_USER_SUCCESS,
//           payload: { res },
//         });
//       } else {
//         dispatch({ type: userContants.GET_ALL_USER_FAILURE });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
