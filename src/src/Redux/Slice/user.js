import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import UserServices from '../API/UserServices';

export const initialState = {
  data: [],
  userData: {},
  loading: 'idle',
  error: null,
  message: null,
};

export const RegisterUser = createAsyncThunk('user/RegisterUser', async (data) => {
  try {
    const res = await UserServices.RegisterUser(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const VerifyUser = createAsyncThunk('user/VerifyUser', async (data) => {
  try {
    console.log('data==>', data);
    const res = await UserServices.VerifyUser(data);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const VerifyForgot = createAsyncThunk('user/VerifyForgot', async (data) => {
  try {
    console.log('data==>', data);
    const res = await UserServices.VerifyForgot(data);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const ResendVerification = createAsyncThunk('user/ResendVerification', async (data) => {
  try {
    console.log('data==>', data);
    const res = await UserServices.ResendVerification(data);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const LoginUser = createAsyncThunk('user/LoginUser', async (data) => {
  try {
    console.log('data==>', data);
    const res = await UserServices.LoginUser(data);
    console.log('res==>', res);
    if (res.data) {
      // toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const ForgotPassword = createAsyncThunk('user/ForgotPassword', async (data) => {
  try {
    console.log('data==>', data);
    const res = await UserServices.ForgotPassword(data);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const ResetPasswords = createAsyncThunk('user/ResetPassword', async (data) => {
  try {
    console.log('data==>', data);
    const res = await UserServices.ResetPassword(data);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getUserData = createAsyncThunk('user/getUserData', async (data) => {
  try {
    console.log('data==>', data);
    const res = await UserServices.getUserData();
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const createWhatsappAccount = createAsyncThunk('user/createWhatsappAccount', async (data) => {
  try {
    console.log('data==>', data);
    const res = await UserServices.createWhatsappAccount(data);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.data = [];
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(RegisterUser.fulfilled, (state) => {
      state.loading = 'idle';
      // state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(VerifyUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(VerifyUser.fulfilled, (state) => {
      state.loading = 'idle';
      // state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(VerifyUser.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(ResendVerification.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(ResendVerification.fulfilled, (state) => {
      state.loading = 'idle';
      // state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(ResendVerification.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(LoginUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(LoginUser.fulfilled, (state) => {
      state.loading = 'idle';
      // state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(ForgotPassword.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(ForgotPassword.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(ForgotPassword.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(ResetPasswords.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(ResetPasswords.fulfilled, (state) => {
      state.loading = 'idle';
      // state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(ResetPasswords.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
    builder.addCase(VerifyForgot.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(VerifyForgot.fulfilled, (state) => {
      state.loading = 'idle';
      // state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(VerifyForgot.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getUserData.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.userData = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(createWhatsappAccount.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(createWhatsappAccount.fulfilled, (state, action) => {
      state.loading = 'idle';
      // state.userData = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(createWhatsappAccount.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },

});

export const { handleLogout } = userSlice.actions;

export default userSlice.reducer;
