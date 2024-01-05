import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import MembershipServices from '../API/MembershipServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const getAllMemberships = createAsyncThunk('member/getAllMemberships', async () => {
  try {
    const res = await MembershipServices.getMemberSip();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const membershipSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMemberships.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllMemberships.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllMemberships.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});

export default membershipSlice.reducer;
