import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import http from "../API/http-common";
import UserServices from "../API/UserServices";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};
// export const userLogin = createAsyncThunk(
//   `login`,
//   async (datas, { rejectWithValue }) => {
//     try {
//       const { data } = await http.post(`/login`, datas);
//       // store user's token in local storage
//       localStorage.setItem("userToken", data.token);
//       localStorage.setItem("user", data.data.id);

//       return data;
//     } catch (error) {
//       // return custom error message from  if any
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

export const getUserDetails = createAsyncThunk(
  `/getProfile`,
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { data } = await UserServices.getUserData();
      return data.data;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.data = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    // // login user
    // [userLogin.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [userLogin.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.userInfo = payload;
    //   state.userToken = payload.userToken;
    // },
    // [userLogin.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    // get user details
    [getUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
