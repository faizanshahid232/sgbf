import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import UsersServices from '../API/UsersServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateUsers = createAsyncThunk('users/CreateUsers', async (data) => {
  try {
    const res = await UsersServices.createUser(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  try {
    const res = await UsersServices.getAllUser();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const toggleStatus = createAsyncThunk('users/toggleStatus', async (data) => {
  try {
    const res = await UsersServices.toggleStatus(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getUsersbyId = createAsyncThunk('users/getUsersbyId', async (id) => {
  try {
    const res = await UsersServices.getUserbyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (data) => {
  try {
    const res = await UsersServices.deleteUser(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editUsers = createAsyncThunk('users/editUsers', async (data) => {
  try {
    const res = await UsersServices.editUser(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateUsers.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateUsers.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateUsers.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteUsers.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteUsers.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editUsers.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editUsers.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editUsers.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getUsersbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getUsersbyId.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getUsersbyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });

    builder.addCase(toggleStatus.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(toggleStatus.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(toggleStatus.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
});

export default usersSlice.reducer;
