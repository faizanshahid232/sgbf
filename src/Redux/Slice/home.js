import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import EventsServices from '../API/EventsServices';
import HomeServices from '../API/HomeServices';

export const initialState = {
  data: [],
  contacts: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const getHomeAbout = createAsyncThunk('accounts/getHomeAbout', async () => {
  try {
    const res = await HomeServices.homeArticle();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const accountsSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomeAbout.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getHomeAbout.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(getHomeAbout.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});

export default accountsSlice.reducer;
