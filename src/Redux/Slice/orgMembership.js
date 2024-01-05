import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import OrganizationMembershipServices from '../API/OrganizationMembershipServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateOrganizationMembership = createAsyncThunk(
  'OrganizationMembership/CreateOrganizationMembership',
  async (data) => {
    try {
      const res = await OrganizationMembershipServices.createOrganizationMembership(data);
      if (res.data) {
        toast.success(res.data.message);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.message;
    }
  }
);

export const getAllOrganizationMembership = createAsyncThunk(
  'OrganizationMembership/getAllOrganizationMembership',
  async () => {
    try {
      const res = await OrganizationMembershipServices.getAllOrganizationMembership();
      if (res.data) {
        toast.success(res.data.message);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.message;
    }
  }
);

export const getOrganizationMembershipbyId = createAsyncThunk(
  'OrganizationMembership/getOrganizationMembershipbyId',
  async (id) => {
    try {
      const res = await OrganizationMembershipServices.getOrganizationMembershipbyId(id);
      if (res.data) {
        toast.success(res.data.message);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.message;
    }
  }
);

export const deleteOrganizationMembership = createAsyncThunk(
  'OrganizationMembership/deleteOrganizationMembership',
  async (data) => {
    try {
      const res = await OrganizationMembershipServices.deleteOrganizationMembership(data);
      if (res.data) {
        toast.success(res.data.message);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.message;
    }
  }
);
export const editOrganizationMembership = createAsyncThunk(
  'OrganizationMembership/editOrganizationMembership',
  async (datas) => {
    try {
      const { id, data } = datas;
      const res = await OrganizationMembershipServices.editOrganizationMembership(id, data);
      if (res.data) {
        toast.success(res.data.message);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.message;
    }
  }
);

export const OrganizationMembershipSlice = createSlice({
  name: 'OrganizationMembership',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateOrganizationMembership.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateOrganizationMembership.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateOrganizationMembership.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllOrganizationMembership.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllOrganizationMembership.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllOrganizationMembership.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteOrganizationMembership.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteOrganizationMembership.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteOrganizationMembership.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editOrganizationMembership.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editOrganizationMembership.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editOrganizationMembership.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getOrganizationMembershipbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getOrganizationMembershipbyId.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getOrganizationMembershipbyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
});

export default OrganizationMembershipSlice.reducer;
