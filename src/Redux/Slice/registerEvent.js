import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import RegisterEventServices from '../API/RegisterEvents';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const registeredEvent = createAsyncThunk('event/eventRegistration', async (data) => {
  try {
    const res = await RegisterEventServices.registerEvent(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const RegisterEventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registeredEvent.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(registeredEvent.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(registeredEvent.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.payload;
    });
  },
});
