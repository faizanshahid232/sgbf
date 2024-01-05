import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import OrganizationMemberService from '../API/OrganizationMemberService';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};


export const getAllOrganizationMember = createAsyncThunk('organizationMember/getAllorganizationMember', async (id) => {
  try {
    const res = await OrganizationMemberService.getAllUser(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});


export const getOrganizationMemberbyId = createAsyncThunk('organizationMember/getorganizationMemberbyId', async (id) => {
  try {
    const res = await OrganizationMemberService.getUserbyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteOrganizationMember = createAsyncThunk('organizationMember/delete organizationMember', async (data) => {
  try {
    const res = await OrganizationMemberService.deleteUser(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const organizationMemberSlice = createSlice({
  name: 'organizationMember',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getAllOrganizationMember.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllOrganizationMember.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllOrganizationMember.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteOrganizationMember.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteOrganizationMember.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteOrganizationMember.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getOrganizationMemberbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getOrganizationMemberbyId.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getOrganizationMemberbyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
});

export default organizationMemberSlice.reducer;
