import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import MemberServices from '../API/Members';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const getAllMembers = createAsyncThunk('memebers/getMembers', async () => {
  try {
    const res = await MemberServices.getMembers();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const getMemberbyId = createAsyncThunk('memebers/getMembers', async (id) => {
  try {
    const res = await MemberServices.getMemberByID(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const MembersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMembers.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllMembers.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(getMemberbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getMemberbyId.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getMemberbyId.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.payload;
    });
  },
});

export default MembersSlice.reducer;
